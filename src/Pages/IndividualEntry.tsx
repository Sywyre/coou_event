import { base } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const [individualData, setIndividualData] = useState<any | RecordData>();

  useEffect(() => {
    base("Form").find(`${param.id}`, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      setIndividualData(record?.fields);
    });
  }, []);

  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {individualData?.surname}
               {individualData?.nin_is_valid}
            </CardTitle>
            <CardDescription>
              This entry was made on {individualData?.date_filled}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-base">
          <div className="grid gap-3">
            <div className="font-semibold text-lg">Personal Details</div>
            <ul className="grid gap-3 font-medium">
              <li>Surname: {individualData?.surname}</li>
              <li>Other Names: {individualData?.other_names}</li>
              <li>Date of Birth: {individualData?.dob}</li>
              <li>Email: {individualData?.email}</li>
              <li>NIN: {individualData?.nin}</li>
              <li>Phone Number: {individualData?.phone_number}</li>
              <li>Gender: {individualData?.gender}</li>
              <li>Address: {individualData?.contact_address}</li>
              <li>State: {individualData?.state_of_origin}</li>
              <li>LGA: {individualData?.lga}</li>
              <li>Town: {individualData?.town}</li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3 font-medium bg-muted/60">
              <div className="font-semibold text-lg">Employment Details</div>
              <li>Staff ID: {individualData?.staff_id}</li>
              <li>Faculty: {individualData?.faculty}</li>
              <li>Department: {individualData?.department}</li>
              <li>Unit: {individualData?.unit}</li>
              <li>
                Date of Assumption of Duty:{" "}
                {individualData?.date_of_assumption_of_duty}
              </li>
              <li>
                Date of Confirmation of Employment:{" "}
                {individualData?.date_of_confirmation_of_employment}
              </li>
              <li>Present Rank: {individualData?.present_rank}</li>
              <li>Grade Level: {individualData?.grade_level}</li>
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
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="font-semibold text-lg">
                Challenges the University is Facing
              </div>
              <div className="font-semibold">{individualData?.challenges}</div>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold text-lg">
                Recommendation on how to fix the Challenges
              </div>
              <div>{individualData?.recommendations}</div>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold text-lg">
                I have my Job Description
              </div>
              <div>{individualData?.job_description}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground"></div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IndividualEntry;
