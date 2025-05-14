import React from "react";
import "./clients.css";

const ClientsSection = () => {
  const clients = [
    { name: "FinTechHub", logo: "/images/clients/fintechhub.png" },
    { name: "HealthCore", logo: "/images/clients/healthcore.png" },
    { name: "InnoSoft", logo: "/images/clients/innosoft.png" },
    { name: "DataSecure", logo: "/images/clients/datasecure.png" },
    { name: "BlockchainX", logo: "/images/clients/blockchainx.png" },
  ];

  return (
    <section className="section clients">
      <div className="container">
        <h2 className="section-title">Our Clients</h2>
        <div className="client-logos">
          {clients.map((client, index) => (
            <div
              className="client-logo-wrapper"
              key={client.name}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img src={client.logo} alt={`${client.name} Logo`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
