import { Dispatch, SetStateAction } from "react";

export interface FooterProps {
    // the number of pages should be displayed, the backend returns this
    totalPages: number,
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}

export interface BoxNumberProp {
    pageNumber: number,
    isActive: boolean,
    pageClick: Dispatch<SetStateAction<number>>
}

export interface PageNumberProp {
    totalPages: number;
    page: number;
    pageClick: Dispatch<SetStateAction<number>>
}