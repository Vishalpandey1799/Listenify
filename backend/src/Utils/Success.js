

export const successThrow = (res, status , message ,data ) =>{
    return res.status(status).json({
        success : true,
        message,
        data
    })
}