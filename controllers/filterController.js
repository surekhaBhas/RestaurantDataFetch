const restaurantData=require('../model/restaurantData.json')


getFilterData=async(req,res)=>{
    
    if(!req.query) return res.status(400).json({"Message":"query parameter required"})
    try{
        if(req.query.cuisine_id){
            // filtered based on cuisine 
            const data= await restaurantData.filter(restaurant=>{
                return restaurant.Cuisine.some(type=>{
                    return type.cuisine==req.query.cuisine_id
                })
               
            })
            
            if(req.query.sort){

                if(req.query.sort==1){
                    // filtered cuisine data sort by ascending order
                    const sortedData=data.slice().sort((a,b)=>a.cost-b.cost)
                    res.json(sortedData)
                }
                else if(req.query.sort==-1){
                    // filtered cuisine data sort by descending order
                    const sortedData=data.slice().sort((a,b)=>b.cost-a.cost)
                    res.json(sortedData)
                 
                }
             }
            res.status(200).json(data)
        }
        else if(req.query.lcost && req.query.hcost){
            // filtered based one cost that means range between high cost and low cost
             const lcost=req.query.lcost;
             const hcost=req.query.hcost;

             const data=await restaurantData.filter(restaurant=>restaurant.cost>=lcost && restaurant.cost<=hcost)
             
             if(req.query.sort){
                if(req.query.sort==1){
                    const sortedData=data.slice().sort((a,b)=>a.cost-b.cost)
                    res.json(sortedData)
                

                }else if(req.query.sort==-1){
                    const sortedData=data.slice().sort((a,b)=>b.cost-a.cost)
                    res.json(sortedData)
                   
                }
             }
             res.staus(200).json(data)
        }
        else if(req.query.sort){
            // restaurant data sorting
            if(req.query.sort==1){
                const sortedData=restaurantData.slice().sort((a,b)=>a.cost-b.cost)
               
                res.json(sortedData)
            }else if(req.query.sort==-1){
                const sortedData=restaurantData.slice().sort((a,b)=>b.cost-a.cost)
                res.json(sortedData)
                
            }
        }

    }catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getFilterData;