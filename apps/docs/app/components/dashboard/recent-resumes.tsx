import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentResumes() {
  return (
    <div className="rounded-2xl border bg-card/40 p-0 shadow-sm">
      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div>
          <p className="text-sm font-medium">Recent Resumes</p>
          <p className="text-xs text-muted-foreground">
            Latest uploads and ATS results
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resume</TableHead>
              <TableHead className="text-right">ATS</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">React Resume.pdf</TableCell>

              <TableCell className="text-right">82</TableCell>

              <TableCell>
                <Badge>Completed</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Node Resume.pdf</TableCell>

              <TableCell className="text-right">75</TableCell>

              <TableCell>
                <Badge variant="secondary">Processing</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
