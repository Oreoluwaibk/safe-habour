import { useEffect, useState } from 'react';

export default function useApplicationStatus(status: string | number, type: 'job' | 'application') {
    const [statusTitle, setStatusTitle] = useState("");
    const [colors, setColors] = useState({ bg: "#fff6f7", color: "#ff0004" });

    useEffect(() => {
        if (type === "application") {
            switch (status) {
                case 1: {
                    setStatusTitle("Pending");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                case 2: {
                    setStatusTitle("Accepted");
                    setColors({bg: "#F3FFF4", color: "#018A06"});
                } break;
                case 3: {
                    setStatusTitle("Rejected");
                    setColors({bg: "#FFF8F9", color: "#670316"});
                } break;
                case 4: {
                    setStatusTitle("Withdrawn");
                    setColors({bg: "#FFF8F9", color: "#670316"});
                } break;
                case 5: {
                    setStatusTitle("Completed");
                    setColors({bg: "#F3FFF4", color: "#018A06"});
                } break;
                default: setStatusTitle("Unrecognized Status"); break;
            }
        }else {
            switch (status) {
                case 1: {
                    setStatusTitle("Open");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                case 2: {
                    setStatusTitle("In Progress");
                    setColors({bg: "#FFFBE6", color: "#FFDD33"});
                } break;
                case 3: {
                    setStatusTitle("Completed");
                    setColors({bg: "#F3FFF4", color: "#018A06"});
                } break;
                case 4: {
                    setStatusTitle("Cancelled");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                case 5: {
                    setStatusTitle("Disputed");
                    setColors({bg: "#FFF8F9", color: "#670316"});
                } break;
                case 6: {
                    setStatusTitle("ServiceWorkerCompleted");
                    setColors({bg: "#F3FFF4", color: "#018A06"});
                } break;
                default: setStatusTitle("Unrecognized Status"); break;
            }
        }
    }, [status, type]);

    return { statusTitle, colors };
}
