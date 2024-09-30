"use client";
import { add } from "@parkwise/sample-lib";
import { useQuery } from "@apollo/client";
import { CompaniesDocument } from "@parkwise/network/src/gql/generated";
export default function Home() {
  const { data } = useQuery(CompaniesDocument);
  console.log('data', data?.companies);
  return (
   <main>
      Hello {add(10, 20)}
      <div>
        {data?.companies?.map((company) => (
          <div key={company?.id}>{company?.displayName}</div>
        ))}
      </div>
   </main>
  );
}
