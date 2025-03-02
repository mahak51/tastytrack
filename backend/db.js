const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://tastytrack:786mahak786@cluster0.dlf7y.mongodb.net/tastytrackmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoURI= "mongodb://tastytrack:786mahak786@cluster0-shard-00-00.dlf7y.mongodb.net:27017,cluster0-shard-00-01.dlf7y.mongodb.net:27017,cluster0-shard-00-02.dlf7y.mongodb.net:27017/tastytrackmern?ssl=true&replicaSet=atlas-ayu3se-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
const mongoDB = async()=>{
     await mongoose.connect(mongoURI,{ useNewUrlParser: true}, async(err,result)=>{
        if(err)console.log("---",err)
        else{    
        console.log("CONNNECTED");
        const fetched_data = await mongoose.connection.db.collection("foodData2");
        fetched_data.find({}).toArray(async function( err, data){
            const foodCollection = await mongoose.connection.db.collection("foodCollection");
            foodCollection.find({}).toArray(function (err, catData){

                if(err)
                    console.log(err);
                else{
                    global.food_items = data;
                    global.foodCollection = catData;

                    
                    }
                })
        })
        }


});
}
module.exports = mongoDB;