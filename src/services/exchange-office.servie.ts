import { AppDataSource as dataSource } from "../bootstrap";
export class ExchangeOfficeService {
  public static getHighestEarners() {
    return dataSource.manager.query(`
    WITH offices AS (select sum((amount * (r3.out / r3.in)) - (bid * (r2.out / r2.in))) as profit,
        country,
        name
 FROM (select e."from"               as fromCurr,
              e."to"                 as toCurr,
              e."ask"                as amount,
              e."exchangeOfficeId"   as exId,
              (ask / (r.out / r.in)) as bid,
              e."date"               as exDate,
              country,
              exOffice.name

       from "exchangeOffices" AS exOffice
                join exchanges e on e."exchangeOfficeId" = exOffice.id
                join rates r
                     on e.from = r.from and e.to = r.to and e."exchangeOfficeId" = r."exchangeOfficeId") as result
          join rates r2 on fromCurr = r2.from and exId = r2."exchangeOfficeId" and r2.to = 'USD' AND (
             EXTRACT(HOUR FROM exDate) = EXTRACT(HOUR FROM r2.date)
         AND
             DATE_TRUNC('day', exDate) = DATE_TRUNC('day', r2.date)
     )
          join rates r3 on tocurr = r3.from and exId = r3."exchangeOfficeId" and r3.to = 'USD' AND (
             EXTRACT(HOUR FROM exDate) = EXTRACT(HOUR FROM r3.date)
         AND
             DATE_TRUNC('day', exDate) = DATE_TRUNC('day', r3.date)
     )
WHERE exDate >= CURRENT_DATE - INTERVAL '10 month'
 group by exId, country, name
 order by (sum((amount * (r3.out / r3.in)) - (bid * (r2.out / r2.in))))::int
),
top_countries AS (
    SELECT country, SUM(profit) AS total_profit
    FROM offices
    GROUP BY country
    ORDER BY total_profit DESC
    LIMIT 3
),
ranked_stores AS (
    SELECT country, name, profit,
           ROW_NUMBER() OVER (PARTITION BY country ORDER BY profit DESC) AS store_rank
    FROM offices
    WHERE country IN (SELECT country FROM top_countries)
)
SELECT rs.country, rs.name, rs.profit
FROM ranked_stores rs
WHERE rs.store_rank <= 3
ORDER BY rs.country, rs.profit DESC;
    `);
  }
}
