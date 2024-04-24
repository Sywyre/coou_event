import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { base } from "@/utils";
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

  useEffect(() => {
    base("Form")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setAllFormDetails(
          records.map((record) => ({ id: record.id, fields: record.fields }))
        );
        console.log("records", records);
        fetchNextPage();
      });
  }, []);

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFormDetails?.map((data: any | FormDetails) => (
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
              <TableCell>
                <Button>Verify</Button>
              </TableCell>
              <TableCell>
                <Button>Capture</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewEntry;
