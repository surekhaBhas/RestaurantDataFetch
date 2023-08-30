const menuItems=require('../model/restaurantMenu.json')

const getMenuItems=async(req,res)=>{
    const page=Number(req.query.page);
    const perPage=Number(req.query.per_page)
    const startIndex=(page-1)*perPage;
    const EndIndex=startIndex+perPage
    try{
        const data=n=menuItems.slice(startIndex,EndIndex)
        res.status.json(data)
    }catch(err){
        res.status(500)
        console.log(err.message)
    }
    
}

module.exports=getMenuItems