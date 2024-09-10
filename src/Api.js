import { apiUrl, prjName } from "./config";

export const bankDetails = async () => {
    try {
        const response = await fetch(`${apiUrl}/bankDetails?user=${prjName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        })

        const parsedData = await response.json();
        //  console.log("Parsed Bank ",parsedData)
        return parsedData
    } catch (error) {
        console.log('Error:', error);
    }
}

export const updatesDetails = async (fromDate, toDate) => {
    try {
        const response = await fetch(`${apiUrl}/updateDetails?user=${prjName}&fromDate=${fromDate}&toDate=${toDate}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        })

        const parsedData = await response.json();
        //  console.log("Parsed Updates ",parsedData)
        return parsedData
    } catch (error) {
        console.log('Error:', error);
    }

}

export const feedbackDetails = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user": prjName,
        "name": data?.name,
        "mobile": data?.mobile,
        "email": data?.email,
        "subject": data?.sub,
        "message": data?.message
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        // console.log(data);
        const response = await fetch(`${apiUrl}/feedbackDetails`, requestOptions);
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

}

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

}