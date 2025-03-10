import { useMemo, useState } from "react";
import { useProducts } from "../composables/products-composables";
import { PRODUCT_LIMIT } from "../config/api";
import { FooterProps, BoxNumberProp, PageNumberProp } from "../cores/component-types";
import { Product, ProductKeys } from "../cores/types";



export const ProductListing = () => {
  const [page, setPage] = useState<number>(1)
  const { pagedProducts, loading, error } = useProducts(page.toString(), PRODUCT_LIMIT)
  const [sortField, setSortField] = useState<ProductKeys | null>(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProducts = useMemo(() => {
    if (!pagedProducts?.products) {
      return []
    }

    const sorted = [...pagedProducts?.products as Product[]];
    if (sortField) {
      sorted.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [pagedProducts, sortField, sortOrder]);

  const handleSort = (field: ProductKeys) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.error || error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('id')}
            >
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('price')}
            >
              Price
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('stock')}
            >
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>


          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.brands.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.categories.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.suppliers.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.average_rating ? Number(product.average_rating).toFixed(2) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Footer page={page} setPage={setPage} totalPages={pagedProducts?.total_pages as number} />

    </div>
  );
};





const Footer = ({ totalPages, page, setPage }: FooterProps) => {
  const backClickable = page > 1
  const forwardClickable = (totalPages - page) >= 1
  return (
    <div className="mt-4 flex justify-center">
      <nav>
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              if (backClickable) setPage(page - 1)
            }}
              className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight ${backClickable ? "hover:bg-gray-100 hover:text-gray-700" : "cursor-not-allowed"} text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg  `}>
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </a>
          </li>
          {
            /**
              * Each line should have between 7-9 boxes of pagination (inclusive of the dots)
              **/
            totalPages <= 7 ? new Array(totalPages).map((index) => {
              const currentPage = index + 1
              return <NumberBox pageNumber={currentPage} isActive={currentPage == page} pageClick={setPage} />
            })
              : page >= 1 && page <= 6 ?
                /* if the active page is at the beginning of the pagination list*/
                <ActivePageBegining page={page} totalPages={totalPages} pageClick={setPage} />
                /*If the current active page is at the ending of the Pagination list*/
                : page >= totalPages - 6 && page <= totalPages ?
                  <ActivePageEnding page={page} totalPages={totalPages} pageClick={setPage} />
                  /* else the active page is in the middle of the pagination list*/
                  : <ActivePageMiddle page={page} totalPages={totalPages} pageClick={setPage} />
          }


          <li>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              if (forwardClickable) setPage(page + 1)
            }}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${forwardClickable ? "hover:bg-gray-100 hover:text-gray-700" : "cursor-not-allowed"} text-gray-500 bg-white border border-gray-300 rounded-e-lg`}>
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}


const NumberBox = ({ pageNumber, pageClick, isActive }: BoxNumberProp) => {
  return (
    <li>
      <a href="#" onClick={(e) => {
        e.preventDefault();
        pageClick(pageNumber)
      }}
        className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border ${isActive ? "border-blue-300 hover:text-blue-700 text-blue-600" : "border-gray-300 hover:text-gray-700 text-gray-500"} hover:bg-gray-100`}>
        {pageNumber}
      </a>
    </li>
  )
}

const DottedBox = () => {
  return (
    <li>
      <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">...</div>
    </li>
  )
}




const ActivePageEnding = ({ page, pageClick, totalPages }: PageNumberProp) => {
  const pagesArray: number[] = []
  for (let index = totalPages - 6; index <= totalPages; index++) {
    pagesArray.push(index)
  }

  return (
    <>
      <NumberBox pageNumber={1} isActive={false} pageClick={pageClick} />
      <DottedBox />
      {
        pagesArray.map((currentNumber) => {
          return <NumberBox key={currentNumber} pageNumber={currentNumber} isActive={currentNumber == page} pageClick={pageClick} />
        })
      }
    </>
  )
}

const ActivePageBegining = ({ page, pageClick, totalPages }: PageNumberProp) => {
  const pagesArray: number[] = []
  for (let index = 0; index < 7; index++) {
    // ensure no non zero page
    pagesArray.push(index + 1)
  }

  return (
    <>
      {
        pagesArray.map((currentNumber) => {
          return <NumberBox key={currentNumber} pageNumber={currentNumber} isActive={currentNumber == page} pageClick={pageClick} />
        })
      }
      <DottedBox />
      <NumberBox pageNumber={totalPages - 1} isActive={false} pageClick={pageClick} />
      <NumberBox pageNumber={totalPages} isActive={false} pageClick={pageClick} />
    </>
  )
}


const ActivePageMiddle = ({ page, pageClick, totalPages }: PageNumberProp) => {
  const pagesArray: number[] = []
  const lower = 3
  const upper = 2
  // If page is 200 and total pages is 300, we want to select from 196th(200-4) item till the 203 item (200+3)
  for (let index = page - lower; index <= page + upper; index++) {
    // ensure no non zero page
    pagesArray.push(index + 1)
  }

  return (
    <>
      <NumberBox pageNumber={1} isActive={false} pageClick={pageClick} />
      <DottedBox />


      {
        pagesArray.map((currentNumber) => {
          return <NumberBox key={currentNumber} pageNumber={currentNumber} isActive={currentNumber == page} pageClick={pageClick} />
        })
      }
      <DottedBox />
      <NumberBox pageNumber={totalPages} isActive={false} pageClick={pageClick} />
    </>
  )
}


