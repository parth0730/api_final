const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = 9000;


const c1 = new Pool({
    user: "postgres",
    host: "localhost",
    database: "api",
    password: "abcd",
    port: 5432,
});
module.exports = c1;
app.use(express.json());

app.route("/api/users")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM users");
        return res.json(result.rows);
    })
    .post(async (req, res) => {
        let user = req.body;
        let q = `INSERT INTO users(user_id, first_name, last_name, email, gender) 
                 VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const result = await c1.query(q, [user.user_id, user.first_name, user.last_name, user.email, user.gender]);
        return res.json(result.rows[0]);
    });

app.route("/api/users/:id")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM users WHERE user_id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    })
    .patch(async (req, res) => {
        let user = req.body;
        let u = `UPDATE users
                           SET first_name = $1, last_name = $2, email = $3, gender = $4
                           WHERE user_id = $5 RETURNING *`;
        const result = await c1.query(u, [user.first_name, user.last_name, user.email, user.gender, req.params.id]);
        return res.json(result.rows[0]);
    })
    .delete(async (req, res) => {
        const result = await c1.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [req.params.id]);
        return res.json({ message:"successfully" });
    });




app.route("/api/employees")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM employee");
        return res.json(result.rows);
    })
    .post(async (req, res) => {
        let emp = req.body;
        let q = `INSERT INTO employee(user_id, hire_date, job_title, job_dept, salary) 
                 VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const result = await c1.query(q, [emp.user_id, emp.hire_date, emp.job_title, emp.job_dept, emp.salary]);
        return res.json(result.rows[0]);
    });

app.route("/api/employees/:id")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM employee WHERE emp_id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    })
    .patch(async (req, res) => {
        let emp = req.body;
        let u = `UPDATE employee
                 SET hire_date = $1, job_title = $2, job_dept = $3, salary = $4
                 WHERE emp_id = $5 RETURNING *`;
        const result = await c1.query(u, [emp.hire_date, emp.job_title, emp.job_dept, emp.salary, req.params.id]);
        return res.json(result.rows[0]);
    })
    .delete(async (req, res) => {
        const result = await c1.query("DELETE FROM employee WHERE emp_id = $1 RETURNING *", [req.params.id]);
        return res.json({ message: "Successfully deleted" });
    });

app.route("/api/addresses")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM address");
        return res.json(result.rows);
    })
    .post(async (req, res) => {
        let addr = req.body;
        let q = `INSERT INTO address(user_id, street, city_name, state_name, country_name) 
                 VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const result = await c1.query(q, [addr.user_id, addr.street, addr.city_name, addr.state_name, addr.country_name]);
        return res.json(result.rows[0]);
    });

app.route("/api/addresses/:id")
    .get(async (req, res) => {
        const result = await c1.query("SELECT * FROM address WHERE address_id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    })
    .patch(async (req, res) => {
        let addr = req.body;
        let u = `UPDATE address
                 SET street = $1, city_name = $2, state_name = $3, country_name = $4
                 WHERE address_id = $5 RETURNING *`;
        const result = await c1.query(u, [addr.street, addr.city_name, addr.state_name, addr.country_name, req.params.id]);
        return res.json(result.rows[0]);
    })
    .delete(async (req, res) => {
        const result = await c1.query("DELETE FROM address WHERE address_id = $1 RETURNING *", [req.params.id]);
        return res.json({ message: "Successfully deleted" });
    });




app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
