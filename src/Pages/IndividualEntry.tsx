import { base } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useNinStore from "@/stores";
import { ReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

interface RecordData {
  surname: string;
  othername: string;
  email: string;
  nin: string;
  phoneNumber: string;
  gender: string;
  address: string;
  state: string;
  lga: string;
  town: string;
  staff_id: string;
  faculty: string;
  department: string;
  unit: string;
  present_rank: string;
  grade_level: string;
  academic_qualification: string;
  professional_qualification: string;
  type_of_employment: string;
  challenges: string;
  recommendations: string;
  job_description: string;
}

const IndividualEntry = () => {
  const param = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [individualData, setIndividualData] = useState<any | RecordData>();
  const { ninDetails } = useNinStore();

  useEffect(() => {
    base(import.meta.env.VITE_AIRTABLE_TABLE).find(
      `${param.id}`,
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        setIndividualData(record?.fields);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentRef.current]);

  return (
    <div ref={componentRef}>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row justify-between items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {individualData?.surname}
              {individualData?.nin_is_valid}
            </CardTitle>
            <CardDescription>
              This entry was made on {individualData?.date_filled}
            </CardDescription>
          </div>
          <ReactToPrint
            trigger={() => {
              return <Button>Print</Button>;
            }}
            content={reactToPrintContent}
          />
        </CardHeader>
        <CardContent className="px-6 py-2 text-base">
          <div className="grid gap-2">
            <div className="font-bold text-lg">Personal Details</div>
            <div className="grid grid-cols-2">
              <ul className="grid gap-3 font-medium text-sm">
                <li>Surname: {individualData?.surname}</li>
                <li>Other Names: {individualData?.other_names}</li>
                <li>Date of Birth: {individualData?.dob}</li>
                <li>
                  Email:{" "}
                  {individualData?.email
                    ? individualData?.email
                    : "No Email was provided"}
                </li>
                <li>NIN: {individualData?.nin}</li>
                <li>Phone Number: {individualData?.phone_number}</li>
                <li>Gender: {individualData?.gender}</li>
                <li>Address: {individualData?.contact_address}</li>
                <li>State: {individualData?.state_of_origin}</li>
                <li>LGA: {individualData?.lga}</li>
                <li>Town: {individualData?.town}</li>
              </ul>
              <div className="flex gap-2">
                {individualData?.captured_img && (
                  <img
                    src={individualData?.captured_img}
                    className="self-start w-[200px] h-[200px] rounded-sm"
                    alt="Screenshot"
                  />
                )}

                {ninDetails.photo && (
                  <img
                    className="self-start w-[200px] h-[200px] rounded-sm"
                    src={`data:image/jpeg;base64,${ninDetails.photo}`}
                  />
                )}
              </div>
            </div>
            <Separator className="my-1" />
            <div className="font-bold text-lg">Employment Details</div>
            <ul className="grid gap-2 font-medium">
              <li>Staff ID: {individualData?.staff_id}</li>
              <li>Teaching Staff: {individualData?.staff_id}</li>
              <li>
                Faculty:{" "}
                {individualData?.faculty
                  ? individualData?.faculty
                  : "This is a non teaching staff"}
              </li>
              <li>Department: {individualData?.department}</li>
              <li>
                Unit:{" "}
                {individualData?.unit
                  ? individualData?.unit
                  : "This is a teaching staff"}
              </li>
              <li>
                Date of Assumption of Duty:{" "}
                {individualData?.date_of_assumption_of_duty}
              </li>
              <li>
                Date of Confirmation of Employment:{" "}
                {individualData?.date_of_confirmation_of_employment}
              </li>
              <li>Present Rank: {individualData?.present_rank}</li>
              <li>
                Last Promotion Date: {individualData?.last_promotion_date}
              </li>
              <li>
                Academic Qualification: {individualData?.academic_qualification}
              </li>
              <li>
                Professional Qualification:{" "}
                {individualData?.professional_qualification}
              </li>
              <li>Type of Employment: {individualData?.type_of_employment}</li>
              <li>
                Other type of Employment:{" "}
                {individualData?.other_type_of_employment
                  ? individualData?.other_type_of_employment
                  : "There is no other "}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualEntry;
