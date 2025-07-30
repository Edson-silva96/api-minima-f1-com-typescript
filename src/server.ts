import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

// Configuração do CORS
// Permite que a API seja acessada de diferentes origens, útil para desenvolvimento e testes
server.register(cors, {
    origin: "*", // Permite requisições de qualquer origem ou digita uma URL específica para usar somente esta api
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    exposedHeaders: ["Content-Length", "X-Requested-With"], // Cabeçalhos expostos
    credentials: true, // Permite cookies e autenticação
});

//dados
const equipes = [
    { id: 1, name: "mclaren", base: "woking, united kingdom" },
    { id: 2, name: "mercedes", base: "brackley, united kingdom" },
    { id: 3, name: "red bull", base: "milton keynes, united kingdom" },
    { id: 4, name: "ferrari", base: "maranello, italy" },
    { id: 5, name: "alpine", base: "enstone, united kingdom" },
    { id: 6, name: "alfa romeo", base: "hinwil, switzerland" },
    { id: 7, name: "aston martin", base: "silverstone, united kingdom" },
    { id: 8, name: "haas", base: "Kannapolis, United States" },
    { id: 9, name: "williams", base: "grove, united kingdom" }
]

const pilotos = [
    { id: 1, name: "max verstappen", team: "red bull"},
    { id: 2, name: "lewis hamilton", team: "mercedes" },
    { id: 3, name: "charles leclerc", team: "ferrari" },
    { id: 4, name: "sergio perez", team: "red bull" },
    { id: 5, name: "george russell", team: "mercedes" },
    { id: 6, name: "lando norris", team: "mclaren" },
    { id: 7, name: "pierre gasly", team: "alpine" },
    { id: 8, name: "esteban ocon", team: "alpine" },
    { id: 9, name: "kevin magnussen", team: "haas" },
    { id: 10, name: "valterri bottas", team: "alfa romeo" }
];

/* rotas */
server.get("/equipes", async (request, response) => {
  response.type("application/json").code(200)
  return { equipes};
});

server.get("/pilotos", async(request, response) => {
    response.type("application/json").code(200)
    return { drivers: pilotos };
});

/* criando rota para buscar um time pelo id */
interface drivers {
    id: string;
}
server.get<{Params: drivers}>("/pilotos/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = pilotos.find( d => d.id === id);

    if (!driver) {
        response.type("application/json").code(404);
        return { message: "Driver not found" };
    } else {
        response.type("application/json").code(200);
        return { driver };
    }
});


server.listen({ port: 3333 }, () => {
    console.log("server init");
});