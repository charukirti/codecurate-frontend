import { ActionButtons } from '@/features/admin/components/action-buttons';
import { StatusBadge } from '@/features/admin/components/status-badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/admin/components/table';
import type { submission } from '@/features/admin/types/admin.types';

interface SubmissionTableProps {
  submissions: submission[];
}

export function SubmissionsTable({ submissions }: SubmissionTableProps) {
  return (
    <Table className="w-full text-sm">
      <TableHeader className="bg-muted/50">
        <TableRow className="border-b">
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Submitter</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">URL</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Topic</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Status</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Submitted</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id} className="border-b hover:bg-muted/30 transition-colors">
            <TableCell className="px-4 py-3">
              <div className="font-medium">{submission.submitter.username}</div>
              <div className="text-xs text-muted-foreground">{submission.submitter.email}</div>
            </TableCell>
            <TableCell className="px-4 py-3 max-w-45 truncate text-xs text-blue-600">{submission.youtubeURL}</TableCell>
            <TableCell className="px-4 py-3">{submission.topic}</TableCell>
            <TableCell className="px-4 py-3">
              <StatusBadge status={submission.status} />
            </TableCell>
            <TableCell className="px-4 py-3 text-muted-foreground text-xs">
              {new Date(submission.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="px-4 py-3">
              <ActionButtons status={submission.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
