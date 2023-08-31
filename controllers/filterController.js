const restaurantData=require('../model/restaurantData.json')
const connectToDB =require('../db')

getFilterData=async(req,res)=>{
    const db=await connectToDB();
    const restaurantCollection=db.collection('restaurantData')
    let query={}
    if(!req.query) return res.status(400).json({"Message":"query parameter required"})
    try{
        if(req.query.cuisine_id){
            // filtered based on cuisine 
           /* const data= await restaurantData.filter(restaurant=>{
                return restaurant.Cuisine.some(type=>{
                    return type.cuisine==req.query.cuisine_id
                })
               
            })*/
            const cuisine_id = req.query.cuisine_id;
    
            query={"Cuisine.cuisine":cuisine_id }
            const data = await restaurantCollection.find(query).toArray();
            
            if(req.query.sort){

                /*if(req.query.sort==1){
                    // filtered cuisine data sort by ascending order
                    const sortedData=data.slice().sort((a,b)=>a.cost-b.cost)
                    res.json(sortedData)
                }
                else if(req.query.sort==-1){
                    // filtered cuisine data sort by descending order
                    const sortedData=data.slice().sort((a,b)=>b.cost-a.cost)
                    res.json(sortedData)
                 
                }*/
               const sortedData=await restaurantCollection.find({"Cuisine.cuisine":cuisine_id }).sort({"cost":Number(req.query.sort)}).toArray()
                res.json(sortedData)
             }
            res.status(200).json(data)
        }
        else if(req.query.lcost && req.query.hcost){
            // filtered based one cost that means range between high cost and low cost
             const lcost=Number(req.query.lcost);
             const hcost=Number(req.query.hcost);

             //const data=await restaurantData.filter(restaurant=>restaurant.cost>=lcost && restaurant.cost<=hcost)
             const data=await restaurantCollection.find({$and:[{"cost":{$gt:lcost,$lt:hcost}}]}).toArray()

             if(req.query.sort){
               /* if(req.query.sort==1){
                    const sortedData=data.slice().sort((a,b)=>a.cost-b.cost)
                    res.json(sortedData)
                

                }else if(req.query.sort==-1){
                    const sortedData=data.slice().sort((a,b)=>b.cost-a.cost)
                    res.json(sortedData)
                   
                }*/
                const sortedData=await restaurantCollection.find({$and:[{"cost":{$gt:lcost,$lt:hcost}}]}).sort({"cost":Number(req.query.sort)}).toArray()
                res.json(sortedData)
            }
             res.status(200).json(data)
        }
        else if(req.query.sort){
            // restaurant data sorting
           /* if(req.query.sort==1){
                const sortedData=restaurantData.slice().sort((a,b)=>a.cost-b.cost)
               
                res.json(sortedData)
            }else if(req.query.sort==-1){
                const sortedData=restaurantData.slice().sort((a,b)=>b.cost-a.cost)
                res.json(sortedData)
                
            }*/
            const sortedData=await restaurantCollection.find().sort({"cost":Number(req.query.sort)}).toArray()
            res.json(sortedData)
        }

    }catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getFilterData;