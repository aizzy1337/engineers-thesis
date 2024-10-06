export interface raportHeaderProps {
    data: raportHeader;
    callback: (header: raportHeader) => void;
}

export interface raportHeader {
    longitude: number,
    latitude: number,
    code?: string
}