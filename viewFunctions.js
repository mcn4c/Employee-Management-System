const displayDepartments = () => {


};
displayRoles();
displayEmployee();

.then((answer) => {
    const query = 'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
    connection.query(query, [ answer.start, answer.end ], (err, res) => {
        if (err) throw err;
        res.forEach(({ position, song, artist, year }) =>
            console.log(`Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`)
        );