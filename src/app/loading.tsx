import React from 'react'
import { CircularProgress } from 'react-loader-spinner'

function loading() {
    return (
        <div className="flex justify-center items-center min-h-full">
            <CircularProgress
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="circular-progress-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
                strokeWidth={2}
                animationDuration={1}
            />
        </div>
    )
}

export default loading
