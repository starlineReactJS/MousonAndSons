import React, { useEffect, useRef, useState } from 'react';

export const Skeleton = (props) => {
    let isLoadingObj = {};
    Object.keys(props?.dependency).forEach(key => {
        isLoadingObj[key] = null;
    });
    const [isLoading, setIsLoading] = useState({ ...isLoadingObj });
    let skeletonTimeoutRef = useRef({ ...isLoadingObj });

    useEffect(() => {
        let tempIsLoading = { ...isLoading };
        Object.keys(props?.dependency)?.forEach(key => {
            if (!!props?.dependency[key] && props?.dependency[key]?.length > 0 && !(!!isLoading[key])) {
                skeletonTimeoutRef.current[key] = setTimeout(() => {
                    tempIsLoading[key] = "dataLoaded";
                    setIsLoading(tempIsLoading);
                }, 700);
            }
        });
    }, [props?.dependency])

    useEffect(() => {
        // if (!!isLoading?.maindata) {
        //     console.log("1");
        //     clearTimeout(skeletonTimeoutRef.current.maindata);
        // }
        // if (!!isLoading?.referenceProductData) {
        //     console.log("2");
        //     clearTimeout(skeletonTimeoutRef.current.referenceProductData);
        // }
        Object.keys(isLoading)?.forEach(key => {
            if (!!isLoading[key]) {
                clearTimeout(skeletonTimeoutRef.current[key]);
            }
        });
    }, [isLoading])

    return isLoading;
}
