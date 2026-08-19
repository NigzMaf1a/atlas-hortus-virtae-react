//shadcn
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

//components
import LabelledText from "./LabelledText"

interface Props {
    btn_label: string
    label_one: string
    label_two: string
    text_one: string
    text_two: string
    onClick: () => void
    more_btn_styles?: string
}

export default function ButtonedListItem(
    {
        btn_label, text_one, text_two,
        label_one, label_two, onClick, more_btn_styles = ''
    }: Props
) {
    return (
        <Card className="w-full h-40 rounded-lg flex flex-row items-center">
            <CardContent className="h-full w-[70%] flex flex-col gap-2">
                <LabelledText
                    label={label_one}
                    text={text_one}
                />

                <LabelledText
                    label={label_two}
                    text={text_two}
                />
            </CardContent>

            <CardContent className="h-full w-[30%] flex justify-center items-center">
                <Button
                    className={`w-30 h-10 ${more_btn_styles}`}
                    onClick={onClick}
                >
                    {btn_label}
                </Button>
            </CardContent>
        </Card>
    )
}
