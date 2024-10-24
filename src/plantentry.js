document.getElementById('plantName').addEventListener('input', validatePlantName);
document.getElementById('plantType').addEventListener('input', validatePlantType);

const planttypes = ["typeA", "typeB", "typeC"];

function validatePlantName() {
    const plantName = document.getElementById("plantName").value;

    if(plantName.length >= 50) {
        return false;
    }
    return true;
}

function validatePlantType() {
    const plantName = document.getElementById("plantType").value;

    

}



module.exports = { validatePlantName, validatePlantType };
