'use client';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAgentFilters } from '../../hooks/use-agent-filters';
import { columns } from '../components/columns';
import { DataPagination } from '../components/data-pagination';
import { DataTable } from '../components/data-table';

export const AgentsView = () => {
  const [filters, setFilters] = useAgentFilters();
  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        onPageChange={(page: number) => setFilters({ page })}
        totalPages={data.totalPages}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return <LoadingState title="Loading agents" description="Please wait while we load the agents" />;
};

export const AgentsViewError = () => {
  return <ErrorState title="Failed to load agents" description="Please try again later" />;
};
