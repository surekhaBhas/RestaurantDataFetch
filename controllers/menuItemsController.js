
const connectToDB =require('../db')

const getMenuItems=async(req,res)=>{
    const db=await connectToDB();
    let query={}
    const menuCollection=db.collection('restaurantMenu')
    let menuIds=(req.query.menu_id);
    menuIds = Array.isArray(menuIds) ? menuIds.map(Number) : menuIds.split(',').map(Number);
    query['menu_id'] = { $in: menuIds };
      
    try{
        
        const result=await menuCollection.find(query).toArray()
        res.status(200).json(result)
      }

    catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getMenuItems;