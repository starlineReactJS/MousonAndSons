import { apiUrl, clientId, prjName } from "./config";
import { Toast } from "./utils";

let toast = Toast();

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
        return parsedData;
    } catch (error) {
        toast.error('Error:', error);
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
        return parsedData;
    } catch (error) {
        toast.error('Error:', error);
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
        const response = await fetch(`${apiUrl}/Feedback`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
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
        return result;
    } catch (error) {
        console.error("An error occurred while fetching feedback details:", error);
        throw error;
    }

};

export const jewelleryDetails = async () => {
    try {
        let Obj = {};
        // Obj = JSON.stringify({
        //     StartDate: fromDate,
        //     EndDate: toDate,
        //     Client: clientId,
        // });
        const response = await fetch(`${apiUrl}GetJewelleryByClientWebByPage`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
            }),
            body: "{'ClientID':" + clientId + ",'pageNO':" + 1 + "}"
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        toast.error('Error:', error);
    }

};

/////////////////////////////////////////////////////////////////////////////

// export const post = async (data, endpoint, formData = false) => {
//     let requestOptions;
//     if (formData) {
//         const formdata = new FormData();
//         formdata.append("user", prjName);
//         let copyFields = ["addressCopy", "panCopy", "gstCopy", "partnershipCopy"];
//         Object.keys(data).forEach(key => {
//             if (copyFields.includes(key) && !!data[key]) {
//                 formdata.append("Files", data[key], data[key]["path"]);
//             } else if (!!data[key]) {
//                 formdata.append(key, data[key]);
//             }
//         });
//         requestOptions = {
//             method: "POST",
//             body: formdata,
//             redirect: "follow"
//         };
//     } else {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: JSON.stringify(data),
//             redirect: "follow",
//         };
//     }

//     try {
//         const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
//         if (!response?.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// export const get = async (endpoint) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json; charset=utf-8");

//     const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//     };

//     try {
//         const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
//         if (!response?.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const parsedData = await response.json();
//         return parsedData;
//     } catch (error) {
//         throw error;
//     }
// };