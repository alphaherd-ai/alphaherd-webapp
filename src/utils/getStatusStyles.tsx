interface StatusStyles {
    textColor: string,
    bgColor: string,
}

const STATUS_STYLES: Record<string, StatusStyles> = {
    "You’re owed": {
        textColor: "text-[#0F9D58]",
        bgColor: "bg-[#E7F5EE]"
    },
    "You owe": {
        textColor: "text-[#FC6E20]",
        bgColor: "bg-[#FFF0E9]"
    },
    "Returned": {
        textColor: "text-[#FF3030]",
        bgColor: "bg-[#FFEAEA]"
    },
    "Pending": {
        textColor: "text-[#FC6E20]",
        bgColor: "bg-[#FFF0E9]"
    },
    "Accepted": {
        textColor: "text-[#0F9D58]",
        bgColor: "bg-[#E7F5EE]"
    }
}

export const getStatusStyles = (status: string) => {
    for (const [key, value] of Object.entries(STATUS_STYLES)) {
        if (status.includes(key)) {
            return value;
        }
    }
    return {
        textColor: "text-[#6B7E7D]",
        bgColor: "bg-[#EDEDED]"

    }
}