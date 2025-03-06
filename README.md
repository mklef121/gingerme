## System Design Task

### High-Level Architecture Diagram

Below is the high level architecture digram for an e-commerce platform that will handle high traffic and scale easily.
![here](./e-commerce.drawio.png)


### Database Design

- User/Auth Service Service Database
    - users
        - id
        - email
        - phone
        - hashed_password
        - status
    - addresses
        - id
        - user_id
        - street
        - city
        - state
        - country
    - auth_session
        - id
        - issued_time
        - expiry_time
        - user_id
        - token_type
        - ip
    - blocked_auth
        - id
        - auth_session_id
- Product and inventory Service Database
    - product
        - id
        - name
        - description
        - price
        - identification
        - price
        - brand_id
        - category_id
    - categories
        - id
        - name
    - brands
        - id
        - name
    - warehouses
        - id
        - name
        - location_id
    - inventory
        - id
        - product_id
        - warehouse_id
        - quantity
-  Order & Cart Service Database
    - cart
        - id
        - user_id
    - cart_items
        - id
        - cart_id
        - product_id
        - quantity
    - orders
        - id
        - user_id
        - address_id
        - order_status
        - payment_status
    - order_items
        - id
        - order_id
        - product_id
        - quantity
-  Payment Service
    - payment
        - id
        - order_id
        - user_id
        - amount
        - status
        - reference_id
        - payment_method
        - authorization_code
        - response_code
        - response_message
        - token_id
    - payment_logs
        - id
        - payment_id
        - log_message
    - tokens
        - id
        - value
        - expiry
        - payment_method
        - user_id

### SQL vs NoSQL choice
Choosing a database storage engine depends on the use case and the specific domain problem at hand.

SQL databases support 
- Data consistency
- Complex queries and relationships
- Transactional integrity

NoSql Database supports
- High Scalability and distributed architecture
- Schema Flexibility
- Fast read and write operations

The payment service database, order & cart service database, inventory database, user service database should use SQL based storage engines.

The notification service can use a NoSql database.

The Search and Recommendation service should connect to a search index database that supports scalable full-text search and a data lake capable of processing user recommendations.


### Scaling Strategy

To scale our e-commerce application effectively, we should focus on infrastructure scaling, database scaling, and optimization of application.

- **Infrastructure scaling**: Ensure that our e-commerce application is deployed across servers distributed across several availability zones and that requests are properly load-balanced across all services. A global load balancer can be used so the DNS service can use latency-based routing to find the load balancer server that best fits the user's request. Lastly, services can be autoscaled depending on infrastructure metrics like CPU and Memory usage.

- **Database scaling**: As read and write operations increase, it's important to properly optimize the database layer. The first point of call will be to properly index our database and properly optimize the queries. The database can also be sharded or partitioned depending on the use case

- **Application optimization**: Our application layer can be broken down from a monolith into a microservice, this will make it easier to scale horizontally. Regularly accessed data can be stored in a cache to reduce the frequency of database access and static contents like images e.t.c should be hosted on CDNs as this will reduce latency. Application design patterns like event-driven architecture should be used so that multiple services can source the same event and process simultaneously.


### Security Considerations
Security Considerations (How would you handle DDoS attacks, API security, data encryption?).

- DDoS attacks: To prevent DDoS attacks we can implement request throttling at the API gateway. Also use a web application firewall and cloud based DDoS Protection services.
- Data Encryption: All web traffic transmission should be encrypted using HTTPS and sensitive data like password should not be stored in plain text. Users payment information like card details should be tokenized and where necessary encrypted.
- API security: User authentication should be stateless and implemented using a secure technique like JWT. The API gateway should be able to identify and validate the user making requests to other services.


## Leadership & Management Task

**Technical Memo**

**To:** Development Team
**From:** Miracle Nwabueze, Technical Lead
**Date:** 5th March, 2025
**Subject:** Monolith vs. Microservices Architectural Decision for Our New eCommerce Platform

**Executive Summary**

This memo addresses the ongoing discussion regarding the architectural approach for our new eCommerce platform.

This memo is about how we should build our new eCommerce platform. We need to choose to structure it as a monolithic or a microservices.

Since we have only three months to complete the project, we must carefully weigh the advantages and disadvantages of each option and choose a pattern that balances simplicity, scalability, and future growth for the company and the team.

This memo will do the following:  
1. Compare the benefits and drawbacks of both options.  
2. Explain which one we’re choosing and why.  
3. Outline a plan in case we need to switch in the future.  
4. Team alignment and conclusion

**Monolithic Architecture: Advantages and Disadvantages**

* **advantages:**
    * **Simplicity:** Easier to develop, deploy, and debug, especially for a small team like ours with the tight deadline we have.
    * **Reduced Complexity:** There are fewer moving parts, and simple communication and messaging patterns,
    * **Faster Initial Development:** A monolith provides faster setup and deployment which takes away the need for complex CI/CD requirements. This will lead to faster development and release in the early stages.
* **disadvantages:**
    * **Scalability Limitations:** When there is a need to scale, it is hard to scale individual components. This will require a vertical increment in hardware resources.
    * **Deployment Bottlenecks:** When changes take place in any part of the application, the entire monolith will have to be redeployment.
    * **Technology Flexibility:** It will be difficult to adopt new technologies or languages that work better for a specific need.
    * **Fault Isolation:** A single failure can bring down the entire application.

**Microservices Architecture: Advantages and Disadvantages**

* **Advantages:**
    * **Scalability:** Independent scaling of individual services based on demand.
    * **Technology Flexibility:** A microservice allows us to use different technologies and languages that can address a specific need for a service.
    * **Fault Isolation:** Failures in one service do affect the entire eCommerce application.
    * **Faster development cycles:** As we grow, it becomes easier for smaller teams to independently manage and deploy changes to domain services.
* **Disadvantages:**
    * **Complexity:** There is increased complexity in development, deployment, and monitoring.
    * **Communication Overhead:** A microservice requires very robust communication patterns between services, a fault in this communication technology can break the application.
    * **Operational Cost:** There will be more complex infrastructure needs which will spike the cost of running the platform.

**Final Decision**
Given our three-month deadline and the current team size, we will proceed with a monolithic architecture for the initial launch. This decision is based on the time constraint, team size, team budget and reduced initial complexity.


**Migration Strategy**
It's a possibility that we might migrate to a microservice architecture in the near future depending on the team growth, scalability bottlenecks, and the company's requirements. To address this in the future, we will need to plan from now, I would suggest we use a pattern called [Modular Monolith](https://www.milanjovanovic.tech/blog/what-is-a-modular-monolith) in developing our current application, this will make it easier to break it up into smaller services in the feature. 
In the case of future Migration, we can adopt the [Strangler Fig pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig) proposed by Microsoft where existing modules on the monolith are incrementally migrated to a service.

**Conclusion**
As already discussed above, we will adopt a monolithic architecture during the initial launch and we will revisit a microservices transition when scaling, flexibility, or deployment needs are required. To achieve this I will provide clear communication at every step, ensuring that everyone's thoughts and contributions are captured in any decision we take. Also, we will be providing training and courses for team members on monolith best practices and microservice architecture.


## SQL Performance & Query Optimization




