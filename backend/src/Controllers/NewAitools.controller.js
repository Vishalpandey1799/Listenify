import {successThrow} from "../Utils/Success.js"
import {errorThrow} from "../Utils/Error.js"



// screen recorder of web page

export const screenRecorder = async (req,res) => {
    try {
        if(!req.user){
              return errorThrow(res,401,"Unauthorized!")
        }


        const {url} = req.body;

        if(!url){
            return errorThrow(res,400,"Please enter url!")
        }


        successThrow(res,200,"Screen recorder started successfully!","url")



    } catch (error) {
        console.log(error?.message)
    }
}


export const getPdfsOfWebsite = async(req,res) =>{
    try {
        if(!req.user){
              return errorThrow(res,401,"Unauthorized!")
        }

        const {url} = req.body;

        if(!url){
            return errorThrow(res,400,"Please enter url!")
        }

        successThrow(res,200,"Pdfs of website fetched successfully!","url")

    } catch (error) {
        console.log(error?.message)
    }
}

 