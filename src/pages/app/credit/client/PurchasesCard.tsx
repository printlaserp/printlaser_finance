import CurrencyFormater from "@helpers/CurrencyFormater";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";


interface BuyCardProps {
    title: string
    description: string
    price: number
}

export default function PurchasesCard({ title = 'Sem título', description = 'Sem descrição', price = 0 }: BuyCardProps) {
    return (
        <Card sx={{ minWidth: 50, width: 200, maxHeight: 200 }}>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                    {title}
                </Typography>
                <Typography variant="body2"  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitLineClamp: 3, // Limita o texto a 3 linhas
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}>
                    {description}
                </Typography>
                <Typography color="red" >
                    {CurrencyFormater.format(Number(price))}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Ver mais</Button>
            </CardActions>
        </Card>
    )
}