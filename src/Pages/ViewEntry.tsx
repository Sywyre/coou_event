/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearch } from "@/stores";
import { base, levels } from "@/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface FormDetails {
  surname: string;
  other_names: string;
  email: string;
  phone_number: string;
  gender: string;
  nin: string;
}

const ViewEntry = () => {
  const [allFormDetails, setAllFormDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useSearch();

  const result = allFormDetails?.filter(
    (data: any) =>
      data.fields.surname.toLowerCase().includes(query?.toLowerCase()) ||
      data.fields.nin.includes(query)
  );

  useEffect(() => {
    setIsLoading(true);
    base(import.meta.env.VITE_AIRTABLE_TABLE)
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setAllFormDetails(
          records.map((record) => ({ id: record.id, fields: record.fields }))
        );
        fetchNextPage();
        setIsLoading(false);
      });
  }, []);

  if (allFormDetails?.length === 0)
    return (
      <p className="text-muted-foreground text-center my-2 text-xs">
        There is no Entry to view
      </p>
    );

  if (result?.length === 0)
    return (
      <p className="text-muted-foreground text-center my-2 text-xs">
        Result not found
      </p>
    );

  if (isLoading)
    return (
      <div className="space-y-2 mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-8 w-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels?.map((data: any | FormDetails) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium p-0 h-[71.33px]">
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
                <TableCell className="p-0 h-[71.33px]">
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
                <TableCell className="p-0 h-[71.33px]">
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
                <TableCell className="p-0 h-[71.33px]">
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
                <TableCell className="p-0 h-[71.33px]">
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
                {/* <TableCell>
                <Button disabled>Verify</Button>
              </TableCell> */}
                <TableCell>
                  <Skeleton className="h-8 w-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );

  return (
    <div>
      <Table>
        <TableCaption>A list of coou staff data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Surname</TableHead>
            <TableHead>Other Names</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>NIN Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.map((data: any | FormDetails) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium p-0 h-[71.33px]">
                <Link
                  to={`/view/${data.id}`}
                  className="flex items-center px-4 w-full h-full"
                >
                  {data.fields.surname}
                </Link>
              </TableCell>
              <TableCell className="p-0 h-[71.33px]">
                <Link
                  to={`/view/${data.id}`}
                  className="flex items-center px-4 w-full h-full"
                >
                  {data.fields.other_names}
                </Link>
              </TableCell>
              <TableCell className="p-0 h-[71.33px]">
                <Link
                  to={`/view/${data.id}`}
                  className="flex items-center px-4 w-full h-full"
                >
                  {data.fields.phone_number}
                </Link>
              </TableCell>
              <TableCell className="p-0 h-[71.33px]">
                <Link
                  to={`/view/${data.id}`}
                  className="flex items-center px-4 w-full h-full"
                >
                  {data.fields.gender}
                </Link>
              </TableCell>
              <TableCell className="p-0 h-[71.33px]">
                <Link
                  to={`/view/${data.id}`}
                  className="flex items-center px-4 w-full h-full"
                >
                  {data.fields.nin_is_valid}
                </Link>
              </TableCell>
              {/* <TableCell>
                <Button disabled>Verify</Button>
              </TableCell> */}
              <TableCell>
                <Link to={`/camera/${data.id}`}>
                  <Button disabled={data.fields.is_captured == "true"}>
                    {data.fields.is_captured == "true" ? "Captured" : "Capture"}
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewEntry;
