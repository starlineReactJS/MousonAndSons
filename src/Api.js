import { apiUrl, clientId, prjName } from "./config";

export const bankDetails = async () => {
    try {
        const response = await fetch(`${apiUrl}/BankDetail`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({
                ClientId: clientId.toString(),
            }),
        });

        const parsedData = await response.json();
        //  console.log("Parsed Bank ",parsedData)
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }
};

export const updatesDetails = async (fromDate, toDate) => {
    try {
        let Obj = {};
        Obj = JSON.stringify({
            StartDate: fromDate,
            EndDate: toDate,
            Client: clientId,
        });
        const response = await fetch(`${apiUrl}/GetNewsDateWise`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({
                Obj: Obj,
            }),
        });

        const parsedData = await response.json();
        //  console.log("Parsed Updates ",parsedData)
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }

};

export const feedbackDetails = async (data) => {
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        Name: data?.name,
        Email: data?.email,
        Phone: data?.mobile,
        Sub: data?.sub,
        Message: data?.message,
        Client: clientId,
    });

    const requestOptions = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
            Obj: raw,
        }),
        redirect: "follow"
    };

    try {
        // console.log(data);
        const response = await fetch(`${apiUrl}/Feedback`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // console.log(result)  
        return result;
    } catch (error) {
        console.error("An error occurred while fetching feedback details:", error);
        throw error;
    }

};

export const OTRDetails = async (data) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user": prjName,
        "Name": data?.name,
        "FirmName": data?.firmname,
        "Mobile": data?.mobile,
        "City": data?.city,

    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(`${apiUrl}/otrDetails`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.error("An error occurred while fetching feedback details:", error);
        throw error;
    }

};