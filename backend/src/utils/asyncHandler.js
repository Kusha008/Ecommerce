const asyncHandler = (fn) => async (req,res,next) => { 
    try{
        await fn(req,res,next)
    }catch(error){
        res.status(error.code?(error.code<600 &&error.code>200):500).json({
            success:false,
            message:error.message
        })
    }
}
            
export { asyncHandler }