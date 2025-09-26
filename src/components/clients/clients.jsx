import React from "react";
import "./clients.css";
import clients from "./clients.js";

const ClientsSection = () => {
  return (
    <section className="section clients">
      <div className="container">
        <h2 className="section-title">Trusted by Leading Companies</h2>
        <p className="section-subtitle">Our partners across industries</p>
        <div className="client-logos">
          {clients.map((client, index) => (
            <div
              className="client-logo-wrapper"
              key={client.name}
              style={{ animationDelay: `${index * 0.15}s` }}
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
