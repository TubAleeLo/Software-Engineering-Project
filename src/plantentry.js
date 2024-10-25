document.getElementById('plantName').addEventListener('input', validatePlantName);
document.getElementById('plantType').addEventListener('input', validatePlantType);

const planttypes = ["TypeA", "TypeB", "TypeC"];

function validatePlantName() {
    const plantName = document.getElementById('plantName').value;

    if (plantName.length >= 50) {
        return false;
    }

    // Check if the string has leading or trailing spaces
    if (plantName !== plantName.trim()) {
        return false;
    }

    // Regular expression to check for special characters (only allows letters, spaces, and em dashes)
    const specialCharPattern = /^[A-Z][a-z]*(?:[\s—][A-Z][a-z]*)*$/;

    // Test for the pattern
    if (!specialCharPattern.test(plantName)) {
        return false;
    }

    return true; // Passes all checks
}

function validatePlantType() {
    const plantType = document.getElementById('plantType').value;

    if(planttypes.includes(plantType)) {
        return true;
    }

    return false;


}



module.exports = { validatePlantName, validatePlantType };
