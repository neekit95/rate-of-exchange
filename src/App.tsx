import './App.css';
import { useEffect, useState } from "react";

interface Currency {
    ID: string;
    NumCode: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}

function App() {
    const [data, setData] = useState<Currency[]>([]);

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => response.json())
            .then((data2) => setData(Object.values(data2.Valute)))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <table className="currency-table">
                <thead>
                <tr>
                    <th>Код валюты</th>
                    <th>Название</th>
                    <th>Лот</th>
                    <th>Номинал</th>
                    <th>Текущий курс</th>
                    <th>Предыдущий курс</th>
                </tr>
                </thead>
                <tbody>
                {data.map((el) => (
                    <tr key={el.ID}>
                        <td>{el.CharCode}</td>
                        <td>{el.Name}</td>
                        <td>{el.NumCode}</td>
                        <td>{el.Nominal}</td>
                        <td>{el.Value.toFixed(2)}</td>
                        <td>{el.Previous.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;