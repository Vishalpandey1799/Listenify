

export const successThrow = (res, status , message ,data ) =>{
    return res.status(status || 200).json({
        success : true,
        message,
        data
    })
}