import { FiCheckSquare } from "react-icons/fi";
import { Card, CardContent } from "../ui/card";

const SheetCard = ({ title, description, questions }) => {
    return (
        <Card className="group relative flex flex-col justify-between  p-4 shadow-sm transition-transform duration-200 hover:scale-[1.02] md:h-[200px]">
            <CardContent className="p-0 flex flex-col h-full justify-between">
                <div
                   
                    className="block"
                >
                    <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-800 group-hover:text-orange-500 transition-colors truncate">
                            {title}
                        </h4>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <FiCheckSquare className="text-gray-500" />
                        <span>{questions} Questions</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SheetCard;
