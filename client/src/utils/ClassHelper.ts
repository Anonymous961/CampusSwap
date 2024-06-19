export function getClassForCondition(condition: string) {
    switch (condition.toLowerCase()) {
        case "best":
            return "text-blue-500";
        case "good":
            return "text-green-500";
        case "bad":
            return "text-yellow-500";
        case "worst":
            return "text-red-500";
        default:
            return "";
    }
}