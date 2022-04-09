pragma solidity ^0.5.0;

contract Medicine{

    struct medCenter{
        address medCenterId;
        string name;
    }
    
    struct med{
        address companyAdd;
        uint medId;
        string medName;
        string mfgDate;
        string expiry;
    }
    
    med[] meds;
    medCenter[] centres;
    
    mapping(uint=>medCenter) delivery;

    function addmed(address _companyAdd,uint _id,string memory _name,string memory _mfgDate,string memory _expiry) public{
        med memory newMed=med({companyAdd:_companyAdd,medId:_id,medName:_name,mfgDate:_mfgDate,expiry:_expiry});
        meds.push(newMed);
    }
    
    function addCenter(address _id,string memory _name) public{
        medCenter memory newCentre=medCenter({medCenterId:_id,name:_name});
        centres.push(newCentre);
    }
    
    function addmedToCenter(uint _id,address _medCenterId) public{
        for(uint i=0;i<centres.length;i++){
            if(centres[i].medCenterId==_medCenterId){
                delivery[_id]=centres[i];
            }
        }
        
    }
    
    function getMedCenterInfo(address _id) public view returns(string memory){
        for(uint i=0;i<centres.length;i++){
            if(centres[i].medCenterId==_id){
                return centres[i].name;
            }
        }
        return "";
    } 
    
    function getmedInfo(uint _id) public view returns(address,string memory){
        for(uint i=0;i<meds.length;i++){
            if(meds[i].medId==_id){
                return (meds[i].companyAdd,meds[i].medName);
            }
        }
        return (address(0),"");
    }
}