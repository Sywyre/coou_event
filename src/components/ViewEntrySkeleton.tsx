import { levels } from "@/utils";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

const ViewEntrySkeleton = () => {
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
          {levels?.map((data) => (
            <TableRow key={data}>
              <TableCell className="font-medium px-4 h-[71.33px]">
                <Skeleton className="h-8 w-auto" />
              </TableCell>
              <TableCell className="px-4 h-[71.33px]">
                <Skeleton className="h-8 w-auto" />
              </TableCell>
              <TableCell className="px-4 h-[71.33px]">
                <Skeleton className="h-8 w-auto" />
              </TableCell>
              <TableCell className="px-4 h-[71.33px]">
                <Skeleton className="h-8 w-auto" />
              </TableCell>
              <TableCell className="px-4 h-[71.33px]">
                <Skeleton className="h-8 w-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewEntrySkeleton;
