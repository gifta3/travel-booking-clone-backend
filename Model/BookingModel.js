const mongoose=require('mongoose');

const BookingSchema= new mongoose.Schema({
UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
UploadedFile:{
    type:String,
    required:true
},
ExtractedText:{
    type:String,
    required:true
},
Itinerary:{
    type:String,
    required:true
},
Status:{
    type:String,
    enum:['processing','completed','failed'],
    default:'processing'
},
},{timestamps:true});
const BookingModel=mongoose.model('Booking',BookingSchema);

module.exports=BookingModel;