import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/admin/components/table';
import { useDeleteResource } from '@/features/admin/mutations/use-delete-resource';
import type { Resource } from '@/features/resources/types/resources.types';

interface ResourcesTableProps {
  resources: Resource[];
}
export function ResourcesTable({ resources }: ResourcesTableProps) {
  const { mutate, isPending } = useDeleteResource();
  function handleDeleteResource(id: string) {
    mutate(id);
  }
  return (
    <Table className="w-full text-sm">
      <TableHeader className="bg-muted/50">
        <TableRow className="border-b">
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Title</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Topic</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Type</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Avg. Rating</TableHead>
          <TableHead className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id} className="border-b hover:bg-muted/30 transition-colors">
            <TableCell className="px-4 py-3">
              <div className="font-medium">{resource.title}</div>
            </TableCell>
            <TableCell className="px-4 py-3">{resource.topic}</TableCell>
            <TableCell className="px-4 py-3">{resource.type}</TableCell>
            <TableCell className="px-4 py-3">{resource.avgRating}</TableCell>
            <TableCell className="px-4 py-3">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteResource(resource.id)}
                disabled={isPending}
              >
                {isPending ? 'Deleting' : 'Delete'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
