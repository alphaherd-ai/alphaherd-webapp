import React from 'react';

interface DeleteIconProps {
    fill: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ fill }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="1. Icons-24">
            <path
                id="Vector"
                d="M4.27478 14.236C3.90267 14.236 3.58802 14.1083 3.33083 13.853C3.07364 13.5976 2.94505 13.2852 2.94505 12.9157V3.57582H2.10156V2.25552H5.64V1.58594H10.3509V2.25552H13.8987V3.57582H13.0552V12.9157C13.0552 13.2769 12.9246 13.5872 12.6632 13.8467C12.4019 14.1062 12.0893 14.236 11.7255 14.236H4.27478ZM11.7255 3.57582H4.27478V12.9157H11.7255V3.57582ZM5.99435 11.5577H7.1545V4.9077H5.99435V11.5577ZM8.8458 11.5577H10.0154V4.9077H8.8458V11.5577Z"
                fill={fill}
            />
        </g>
    </svg>
);

export default DeleteIcon;
