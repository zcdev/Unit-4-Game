$(document).ready(function () {

    // Declare and assign letiables
    let computerPick = Math.floor(19 + Math.random() * (120 + 1 - 19));
    let totalScore = 0;
    let wins = 0;
    let losses = 0;
    let allEggNumbers = [];
    const ding = new Audio('assets/sounds/ding.mp3');
    const down = new Audio('assets/sounds/down.mp3');

    // Starting the game
    resetGame();

    // When player clicks the egg, computer display its picked number and compare against total egg numbers
    $(".egg").on("click", function () {
        $("#computer-pick").text(computerPick);
        let eggValue = $(this).val();
        totalScore += parseInt(eggValue);
        $("#total-score").text(totalScore);
        $("#status").removeClass("animate");

        // If total egg number is equal to computer's picked number
        if (totalScore === computerPick) {
            wins++;
            $("#wins").text(wins);
            ding.play();
            $('#popMessage').modal('show');
            $("#status").text("Yay, you won!!!");
            $("#status").removeClass("animate-lost");
            $("#status").addClass("animate-won");
            resetGame();

            // If total egg number is greater than computer's picked number
        } else if (totalScore > computerPick) {
            losses++;
            $("#losses").text(losses);
            down.play();
            $('#popMessage').modal('show');
            $("#status").text("Uh-oh, you lost!!!");
            $("#status").removeClass("animate-won");
            $("#status").addClass("animate-lost");
            resetGame();
        }
    });

    // Reset the game
    function resetGame() {
        $("#computer-pick").empty();
        computerPick = Math.floor(19 + Math.random() * (120 + 1 - 19));
        $("#computer-pick").text(computerPick);
        allEggNumbers = [];
        totalScore = 0;

        // Generate each unique egg number
        while (allEggNumbers.length < 4) {
            let eggNumber = Math.floor(Math.random() * 12) + 1;
            if (!allEggNumbers.includes(eggNumber)) {
                if (Number.parseInt($(".egg").val()) !== eggNumber) {
                    allEggNumbers.push(eggNumber);
                }
            }

            // Assign each unique egg number to its value
            $(".egg").each(function(index) {
                $(this).val(allEggNumbers[index]);
                $("#computer-pick").text(computerPick);
            });
        }
    }

});