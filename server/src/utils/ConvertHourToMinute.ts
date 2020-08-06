export default function convertHourToMinutes(time: string){
    const [h, m] = time.split(':').map(Number);
    const timeInMinutes = (h*60) + m;
    return timeInMinutes;
}