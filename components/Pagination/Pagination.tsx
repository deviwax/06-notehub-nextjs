'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination">
      <ul style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
        <li>
          <button
            aria-label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {pages.map((p) => (
          <li key={p}>
            <button
              aria-label={`Go to page ${p}`}
              onClick={() => onPageChange(p)}
              disabled={p === currentPage}
            >
              {p}
            </button>
          </li>
        ))}

        <li>
          <button
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}