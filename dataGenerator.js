

// Мужские имена - взвешенные по популярности (более частые имена в начале)
const MALE_FIRST_NAMES = [
  // Топ популярные (40%)
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark',
  'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  // Часто используемые (35%)
  'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason',
  'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen',
  'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel',
  // Современные популярные (15%)
  'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander',
  'Ethan', 'Sebastian', 'Aiden', 'Jackson', 'Carter', 'Jayden', 'Luke', 'Dylan',
  // Менее частые (10%)
  'Raymond', 'Gregory', 'Frank', 'Patrick', 'Jack', 'Dennis', 'Jerry', 'Tyler',
  'Aaron', 'Jose', 'Adam', 'Henry', 'Nathan', 'Douglas', 'Zachary', 'Peter',
  'Kyle', 'Walter', 'Jeremy', 'Harold', 'Keith', 'Christian', 'Roger', 'Gerald',
  'Carl', 'Terry', 'Sean', 'Austin', 'Arthur', 'Lawrence', 'Jesse', 'Bryan',
  'Joe', 'Jordan', 'Billy', 'Bruce', 'Albert', 'Willie', 'Gabriel', 'Alan',
  'Juan', 'Wayne', 'Roy', 'Ralph', 'Randy', 'Eugene', 'Vincent', 'Russell',
  'Louis', 'Bobby', 'Philip', 'Johnny', 'Bradley', 'Caleb', 'Isaiah', 'Landon',
  'Owen', 'Wyatt', 'Hunter', 'Cooper'
];

// Женские имена - взвешенные по популярности
const FEMALE_FIRST_NAMES = [
  // Топ популярные (40%)
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra',
  'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna',
  // Часто используемые (35%)
  'Michelle', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca',
  'Laura', 'Sharon', 'Cynthia', 'Kathleen', 'Amy', 'Shirley', 'Angela', 'Helen',
  'Anna', 'Brenda', 'Pamela', 'Nicole', 'Emma', 'Samantha',
  // Современные популярные (15%)
  'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper',
  'Evelyn', 'Abigail', 'Ella', 'Scarlett', 'Grace', 'Chloe', 'Victoria', 'Madison',
  // Менее частые (10%)
  'Katherine', 'Christine', 'Debra', 'Rachel', 'Catherine', 'Carolyn', 'Janet',
  'Ruth', 'Maria', 'Heather', 'Diane', 'Virginia', 'Julie', 'Joyce', 'Kelly',
  'Christina', 'Lauren', 'Joan', 'Judith', 'Megan', 'Cheryl', 'Andrea', 'Hannah',
  'Jacqueline', 'Martha', 'Gloria', 'Teresa', 'Ann', 'Sara', 'Frances', 'Kathryn',
  'Janice', 'Jean', 'Alice', 'Judy', 'Denise', 'Amber', 'Doris', 'Marilyn',
  'Danielle', 'Beverly', 'Theresa', 'Diana', 'Natalie', 'Brittany', 'Marie',
  'Kayla', 'Alexis', 'Aurora', 'Lily', 'Zoey', 'Riley', 'Layla', 'Nora'
];

// Вторые имена (Middle names) - используются в 70% случаев
const MIDDLE_NAMES = [
  'Lee', 'Marie', 'Ann', 'Rose', 'Lynn', 'Grace', 'Elizabeth', 'James', 'Ray',
  'Mae', 'Jean', 'Louise', 'Michael', 'Allen', 'Joseph', 'Anthony', 'Edward',
  'Thomas', 'Robert', 'William', 'Jane', 'Nicole', 'Michelle', 'Nicole', 'Kay',
  'Sue', 'Jo', 'Rae', 'Dawn', 'Renee', 'Faith', 'Hope', 'Joy', 'Paige', 'Scott',
  'David', 'John', 'Paul', 'Ryan', 'Alexander', 'Benjamin', 'Charles', 'Daniel'
];

// Фамилии - расширенный список с разнообразием
const LAST_NAMES = [
  // Самые популярные (30%)
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  // Популярные (40%)
  'Lee', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis',
  'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres',
  'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall',
  'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips',
  'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  // Менее популярные (30%)
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz',
  'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos',
  'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood',
  'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez',
  'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
  'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler',
  'Henderson', 'Barnes', 'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero',
  'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham', 'Reynolds', 'Griffin',
  'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Chapman', 'Harrison', 'Freeman',
  'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks',
  'Crawford', 'Henry', 'Boyd', 'Mason', 'Morrison', 'Kennedy', 'Warren', 'Dixon'
];

// Названия улиц - расширенный список
const STREET_NAMES = [
  // Популярные базовые названия (40%)
  'Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lake', 'Hill',
  'Park', 'Walnut', 'Church', 'Spring', 'Forest', 'Meadow', 'Grove', 'Lincoln',
  'Franklin', 'Jefferson', 'Madison', 'Adams', 'Jackson', 'Wilson',
  // Числовые улицы (20%)
  'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth',
  'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth',
  // Природные названия (25%)
  'Sunset', 'Sunrise', 'River', 'Highland', 'Chestnut', 'Willow', 'Cherry',
  'Hickory', 'Dogwood', 'Birch', 'Spruce', 'Sycamore', 'Poplar', 'Magnolia',
  'Ash', 'Beech', 'Linden', 'Laurel', 'Valley', 'Ridge', 'Summit', 'Mountain',
  'Canyon', 'Creek', 'Brook', 'Stream', 'Pond', 'Shore', 'Beach', 'Bay',
  // Описательные (15%)
  'Pleasant', 'Grand', 'Broad', 'Center', 'Market', 'Water', 'Union', 'Bridge',
  'Mill', 'State', 'School', 'College', 'University', 'Liberty', 'Pearl', 'Vine',
  'Garden', 'Colonial', 'Heritage', 'Woodland', 'Riverside', 'Fairview', 'Hillside',
  'Lakeside', 'Broadway', 'Central', 'Court', 'Green', 'High', 'King', 'Queen',
  'Prince', 'Duke', 'Royal', 'Crown', 'Castle', 'Manor', 'Estate', 'Village',
  'Country', 'Orchard', 'Harvest', 'Autumn', 'Summer', 'Winter', 'Silver', 'Golden'
];

// Направления для улиц (используются в 30% случаев)
const STREET_DIRECTIONS = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];

// Типы улиц с весами популярности
const STREET_TYPES = [
  'Street', 'Street', 'Street', 'Street', // 40% - самый популярный
  'Avenue', 'Avenue', 'Avenue', // 30%
  'Road', 'Road', 'Drive', 'Drive', // 20%
  'Lane', 'Court', 'Circle', 'Boulevard', 'Way', 'Place', // 10%
  'Terrace', 'Trail', 'Parkway', 'Commons', 'Plaza', 'Loop', 'Path'
];

// Города по штатам (реальные города США) - расширенная база данных
const CITIES_BY_STATE = {
  'AL': { name: 'Alabama', code: 'AL', cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Hoover', 'Dothan', 'Auburn', 'Decatur', 'Madison', 'Florence', 'Gadsden', 'Vestavia Hills', 'Prattville', 'Phenix City', 'Alabaster', 'Bessemer', 'Enterprise', 'Opelika', 'Homewood'] },
  'AK': { name: 'Alaska', code: 'AK', cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer', 'Homer', 'Soldotna', 'Valdez', 'Nome', 'Kotzebue', 'Barrow', 'Seward', 'Petersburg', 'Wrangell', 'Unalaska'] },
  'AZ': { name: 'Arizona', code: 'AZ', cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise', 'Yuma', 'Avondale', 'Flagstaff', 'Goodyear', 'Buckeye', 'Lake Havasu City', 'Casa Grande', 'Prescott Valley', 'Sierra Vista', 'Maricopa'] },
  'AR': { name: 'Arkansas', code: 'AR', cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Pine Bluff', 'Bentonville', 'Hot Springs', 'Benton', 'Texarkana', 'Sherwood', 'Jacksonville', 'Russellville', 'Bella Vista', 'Paragould', 'Cabot', 'Searcy'] },
  'CA': { name: 'California', code: 'CA', cities: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista', 'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Oxnard', 'Moreno Valley', 'Huntington Beach', 'Glendale', 'Santa Clarita', 'Garden Grove', 'Oceanside', 'Rancho Cucamonga', 'Santa Rosa', 'Ontario', 'Lancaster'] },
  'CO': { name: 'Colorado', code: 'CO', cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Centennial', 'Boulder', 'Greeley', 'Longmont', 'Loveland', 'Grand Junction', 'Broomfield', 'Castle Rock', 'Commerce City', 'Parker', 'Littleton'] },
  'CT': { name: 'Connecticut', code: 'CT', cities: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Bristol', 'Meriden', 'West Haven', 'Milford', 'Middletown', 'Norwich', 'Shelton', 'Torrington', 'New London', 'Ansonia', 'Derby', 'Groton'] },
  'DE': { name: 'Delaware', code: 'DE', cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle', 'Bear', 'Glasgow', 'Brookside', 'Hockessin', 'Pike Creek', 'Claymont', 'Edgemoor', 'North Star', 'Wilmington Manor', 'Newark'] },
  'FL': { name: 'Florida', code: 'FL', cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral', 'Pembroke Pines', 'Hollywood', 'Miramar', 'Coral Springs', 'Clearwater', 'Miami Gardens', 'Palm Bay', 'Pompano Beach', 'West Palm Beach', 'Lakeland', 'Davie', 'Miami Beach', 'Sunrise', 'Plantation', 'Boca Raton', 'Deltona', 'Largo', 'Deerfield Beach', 'Palm Coast', 'Melbourne'] },
  'GA': { name: 'Georgia', code: 'GA', cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Johns Creek', 'Albany', 'Warner Robins', 'Alpharetta', 'Marietta', 'Valdosta', 'Smyrna', 'Dunwoody', 'Rome', 'East Point', 'Peachtree City', 'Gainesville'] },
  'HI': { name: 'Hawaii', code: 'HI', cities: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu', 'Kaneohe', 'Mililani', 'Kahului', 'Ewa Gentry', 'Kihei', 'Kailua-Kona', 'Wahiawa', 'Ewa Beach', 'Wailuku', 'Halawa', 'Makakilo', 'Waimalu', 'Schofield Barracks', 'Waianae', 'Nanakuli'] },
  'ID': { name: 'Idaho', code: 'ID', cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello', 'Caldwell', 'Coeur d\'Alene', 'Twin Falls', 'Lewiston', 'Post Falls', 'Rexburg', 'Eagle', 'Moscow', 'Kuna', 'Ammon', 'Chubbuck', 'Hayden', 'Mountain Home', 'Blackfoot', 'Garden City'] },
  'IL': { name: 'Illinois', code: 'IL', cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin', 'Waukegan', 'Cicero', 'Champaign', 'Bloomington', 'Arlington Heights', 'Evanston', 'Decatur', 'Schaumburg', 'Bolingbrook', 'Palatine', 'Skokie', 'Des Plaines', 'Orland Park', 'Tinley Park', 'Oak Lawn', 'Berwyn', 'Mount Prospect', 'Normal', 'Wheaton', 'Hoffman Estates', 'Oak Park', 'Downers Grove'] },
  'IN': { name: 'Indiana', code: 'IN', cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Bloomington', 'Fishers', 'Hammond', 'Gary', 'Muncie', 'Lafayette', 'Terre Haute', 'Kokomo', 'Anderson', 'Noblesville', 'Greenwood', 'Elkhart', 'Mishawaka', 'Lawrence', 'Jeffersonville'] },
  'IA': { name: 'Iowa', code: 'IA', cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Council Bluffs', 'Ames', 'West Des Moines', 'Dubuque'] },
  'KS': { name: 'Kansas', code: 'KS', cities: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina'] },
  'KY': { name: 'Kentucky', code: 'KY', cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Richmond', 'Georgetown', 'Florence', 'Hopkinsville', 'Nicholasville'] },
  'LA': { name: 'Louisiana', code: 'LA', cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Houma'] },
  'ME': { name: 'Maine', code: 'ME', cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Saco', 'Augusta', 'Westbrook'] },
  'MD': { name: 'Maryland', code: 'MD', cities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf', 'Glen Burnie', 'Ellicott City', 'Frederick', 'Dundalk', 'Rockville', 'Bethesda', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Annapolis', 'College Park', 'Salisbury', 'Laurel', 'Greenbelt', 'Cumberland', 'Westminster', 'Parkville', 'Potomac', 'Towson', 'Aspen Hill', 'Wheaton', 'Catonsville', 'Severn', 'Odenton', 'Owings Mills'] },
  'MA': { name: 'Massachusetts', code: 'MA', cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'Quincy', 'Lynn', 'New Bedford', 'Fall River', 'Newton', 'Somerville', 'Lawrence', 'Framingham', 'Haverhill', 'Waltham', 'Malden', 'Brookline', 'Plymouth', 'Medford', 'Taunton', 'Chicopee', 'Weymouth', 'Revere', 'Peabody', 'Methuen', 'Barnstable', 'Pittsfield', 'Attleboro', 'Everett'] },
  'MI': { name: 'Michigan', code: 'MI', cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing', 'Flint', 'Dearborn', 'Livonia', 'Clinton', 'Canton', 'Troy', 'Westland', 'Farmington Hills', 'Kalamazoo', 'Wyoming', 'Southfield', 'Rochester Hills', 'Taylor', 'Pontiac', 'St. Clair Shores', 'Royal Oak', 'Novi', 'Dearborn Heights', 'Battle Creek', 'Saginaw', 'Kentwood', 'East Lansing', 'Roseville', 'Portage'] },
  'MN': { name: 'Minnesota', code: 'MN', cities: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'St. Cloud', 'Eagan', 'Woodbury', 'Maple Grove', 'Eden Prairie', 'Coon Rapids', 'Burnsville', 'Blaine', 'Lakeville', 'Minnetonka', 'Apple Valley', 'Edina', 'St. Louis Park', 'Moorhead', 'Mankato', 'Shakopee', 'Maplewood', 'Cottage Grove', 'Richfield', 'Roseville', 'Inver Grove Heights', 'Brooklyn Center', 'Andover'] },
  'MS': { name: 'Mississippi', code: 'MS', cities: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi', 'Meridian', 'Tupelo', 'Greenville', 'Olive Branch', 'Horn Lake'] },
  'MO': { name: 'Missouri', code: 'MO', cities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'Blue Springs'] },
  'MT': { name: 'Montana', code: 'MT', cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre', 'Anaconda', 'Miles City'] },
  'NE': { name: 'Nebraska', code: 'NE', cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk', 'Columbus', 'Papillion'] },
  'NV': { name: 'Nevada', code: 'NV', cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Fernley', 'Elko', 'Mesquite', 'Boulder City', 'Pahrump', 'Spring Valley', 'Enterprise', 'Sunrise Manor', 'Paradise', 'Whitney', 'Winchester', 'Summerlin South', 'Incline Village', 'Fallon'] },
  'NH': { name: 'New Hampshire', code: 'NH', cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester', 'Salem', 'Merrimack', 'Hudson', 'Londonderry', 'Keene', 'Portsmouth', 'Goffstown', 'Laconia', 'Hampton', 'Durham', 'Exeter', 'Bedford', 'Windham', 'Milford'] },
  'NJ': { name: 'New Jersey', code: 'NJ', cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison', 'Woodbridge', 'Lakewood', 'Toms River', 'Hamilton', 'Trenton', 'Clifton', 'Camden', 'Brick', 'Cherry Hill', 'Passaic', 'Union City', 'Bayonne', 'East Orange', 'Vineland', 'New Brunswick', 'Hoboken', 'Perth Amboy', 'West New York', 'Plainfield', 'Hackensack', 'Sayreville', 'Kearny', 'Linden', 'Atlantic City', 'Fort Lee'] },
  'NM': { name: 'New Mexico', code: 'NM', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'Clovis', 'Hobbs', 'Alamogordo', 'Carlsbad'] },
  'NY': { name: 'New York', code: 'NY', cities: ['New York', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'White Plains', 'Hempstead', 'Troy', 'Niagara Falls', 'Binghamton', 'Freeport', 'Valley Stream', 'Long Beach', 'Spring Valley', 'North Tonawanda', 'Jamestown', 'Poughkeepsie', 'Newburgh', 'Ithaca', 'Elmira', 'Watertown', 'Rome', 'Kingston', 'Middletown', 'Saratoga Springs'] },
  'NC': { name: 'North Carolina', code: 'NC', cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Concord', 'Greenville', 'Asheville', 'Gastonia', 'Jacksonville', 'Chapel Hill', 'Rocky Mount', 'Burlington', 'Wilson', 'Huntersville', 'Kannapolis', 'Apex', 'Hickory', 'Goldsboro', 'Indian Trail', 'Mooresville'] },
  'ND': { name: 'North Dakota', code: 'ND', cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Dickinson', 'Mandan', 'Jamestown', 'Wahpeton', 'Devils Lake', 'Watford City', 'Valley City', 'Grafton', 'Beulah', 'Rugby', 'Hazen', 'Stanley', 'Bottineau', 'Mayville'] },
  'OH': { name: 'Ohio', code: 'OH', cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain', 'Hamilton', 'Springfield', 'Kettering', 'Elyria', 'Lakewood', 'Cuyahoga Falls', 'Middletown', 'Newark', 'Euclid', 'Mansfield', 'Mentor', 'Beavercreek', 'Cleveland Heights', 'Strongsville', 'Dublin', 'Fairfield', 'Findlay', 'Warren', 'Lancaster', 'Lima'] },
  'OK': { name: 'Oklahoma', code: 'OK', cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater', 'Muskogee', 'Bartlesville', 'Owasso', 'Shawnee', 'Ponca City', 'Ardmore', 'Duncan', 'Del City', 'Yukon', 'Sapulpa'] },
  'OR': { name: 'Oregon', code: 'OR', cities: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis', 'Albany', 'Tigard', 'Lake Oswego', 'Keizer', 'Oregon City', 'McMinnville', 'Redmond', 'Grants Pass', 'Tualatin', 'West Linn'] },
  'PA': { name: 'Pennsylvania', code: 'PA', cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona', 'York', 'State College', 'Wilkes-Barre', 'Chester', 'Williamsport', 'Easton', 'Lebanon', 'Hazleton', 'New Castle', 'Johnstown', 'McKeesport', 'Hermitage', 'Greensburg', 'Pottstown', 'Monroeville', 'Plum', 'Norristown', 'Bethel Park', 'King of Prussia', 'Drexel Hill'] },
  'RI': { name: 'Rhode Island', code: 'RI', cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Coventry', 'Cumberland', 'North Providence', 'South Kingstown'] },
  'SC': { name: 'South Carolina', code: 'SC', cities: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Sumter', 'Goose Creek', 'Hilton Head Island'] },
  'SD': { name: 'South Dakota', code: 'SD', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Pierre', 'Huron', 'Vermillion'] },
  'TN': { name: 'Tennessee', code: 'TN', cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Bartlett'] },
  'TX': { name: 'Texas', code: 'TX', cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie', 'Brownsville', 'Pasadena', 'McKinney', 'Mesquite', 'McAllen', 'Killeen', 'Frisco', 'Waco', 'Carrollton', 'Denton', 'Midland', 'Abilene', 'Beaumont', 'Round Rock', 'Odessa', 'Wichita Falls', 'Richardson', 'Lewisville', 'Tyler', 'College Station', 'Pearland', 'San Angelo', 'Allen', 'League City', 'Sugar Land'] },
  'UT': { name: 'Utah', code: 'UT', cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton', 'Taylorsville'] },
  'VT': { name: 'Vermont', code: 'VT', cities: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans', 'Newport', 'Vergennes', 'Brattleboro'] },
  'VA': { name: 'Virginia', code: 'VA', cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Suffolk', 'Lynchburg', 'Harrisonburg', 'Leesburg', 'Charlottesville', 'Blacksburg', 'Danville', 'Manassas', 'Petersburg', 'Fredericksburg', 'Winchester', 'Salem', 'Staunton', 'Hopewell', 'Bristol', 'Waynesboro', 'Colonial Heights', 'Radford', 'Pulaski', 'Martinsville', 'South Boston'] },
  'WA': { name: 'Washington', code: 'WA', cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton', 'Yakima', 'Federal Way', 'Spokane Valley', 'Bellingham', 'Kennewick', 'Auburn', 'Pasco', 'Marysville', 'Lakewood', 'Redmond', 'Shoreline', 'Richland', 'Kirkland', 'Burien', 'Sammamish', 'Olympia', 'Lacey', 'Edmonds', 'Bremerton', 'Puyallup', 'Longview', 'University Place'] },
  'WV': { name: 'West Virginia', code: 'WV', cities: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg', 'South Charleston', 'St. Albans', 'Vienna', 'Bluefield', 'Teays Valley', 'Bridgeport', 'Oak Hill', 'Cross Lanes', 'Hurricane', 'Nitro'] },
  'WI': { name: 'Wisconsin', code: 'WI', cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Eau Claire', 'Oshkosh', 'Janesville', 'West Allis', 'La Crosse', 'Sheboygan', 'Wauwatosa', 'Fond du Lac', 'New Berlin', 'Wausau', 'Brookfield', 'Greenfield', 'Beloit', 'Franklin', 'Oak Creek', 'Manitowoc', 'West Bend', 'Sun Prairie', 'Superior', 'Stevens Point', 'Neenah', 'Fitchburg', 'Mequon'] },
  'WY': { name: 'Wyoming', code: 'WY', cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Jackson'] }
};

// Диапазоны ZIP кодов по штатам
const ZIP_RANGES = {
  'AL': [35000, 36999], 'AK': [99500, 99999], 'AZ': [85000, 86599], 'AR': [71600, 72999],
  'CA': [90000, 96199], 'CO': [80000, 81699], 'CT': [6000, 6999], 'DE': [19700, 19999],
  'FL': [32000, 34999], 'GA': [30000, 31999], 'HI': [96700, 96899], 'ID': [83200, 83899],
  'IL': [60000, 62999], 'IN': [46000, 47999], 'IA': [50000, 52999], 'KS': [66000, 67999],
  'KY': [40000, 42799], 'LA': [70000, 71599], 'ME': [3900, 4999], 'MD': [20600, 21999],
  'MA': [1000, 2799], 'MI': [48000, 49999], 'MN': [55000, 56799], 'MS': [38600, 39799],
  'MO': [63000, 65899], 'MT': [59000, 59999], 'NE': [68000, 69399], 'NV': [88900, 89899],
  'NH': [3000, 3899], 'NJ': [7000, 8999], 'NM': [87000, 88499], 'NY': [10000, 14999],
  'NC': [27000, 28999], 'ND': [58000, 58899], 'OH': [43000, 45999], 'OK': [73000, 74999],
  'OR': [97000, 97999], 'PA': [15000, 19699], 'RI': [2800, 2999], 'SC': [29000, 29999],
  'SD': [57000, 57799], 'TN': [37000, 38599], 'TX': [75000, 79999], 'UT': [84000, 84799],
  'VT': [5000, 5999], 'VA': [20100, 24699], 'WA': [98000, 99499], 'WV': [24700, 26899],
  'WI': [53000, 54999], 'WY': [82000, 83199]
};

/**
 * Генерирует случайное число в диапазоне (оптимизированная версия)
 * Кэшируем Math.random для лучшей производительности
 */
const randomCache = [];
const RANDOM_CACHE_SIZE = 1000;
let randomCacheIndex = 0;

// Предзаполняем кэш случайных чисел
for (let i = 0; i < RANDOM_CACHE_SIZE; i++) {
  randomCache[i] = Math.random();
}

function randomInt(min, max) {
  // Используем кэш для быстрого доступа
  if (randomCacheIndex >= RANDOM_CACHE_SIZE) {
    randomCacheIndex = 0;
    // Обновляем кэш в фоне
    for (let i = 0; i < RANDOM_CACHE_SIZE; i++) {
      randomCache[i] = Math.random();
    }
  }
  const r = randomCache[randomCacheIndex++];
  return Math.floor(r * (max - min + 1)) + min;
}

/**
 * Выбирает случайный элемент из массива с оптимизацией
 * Использует взвешенную выборку для более реалистичного распределения
 */
function randomChoice(arr) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  if (randomCacheIndex >= RANDOM_CACHE_SIZE) {
    randomCacheIndex = 0;
  }
  const r = randomCache[randomCacheIndex++];
  return arr[Math.floor(r * arr.length)];
}

/**
 * Выбирает элемент с учётом популярности (первые элементы чаще)
 * Использует квадратный корень для смещения распределения к началу
 * Оптимизировано: кэшируем Math.pow для часто используемых значений
 */
const powCache = new Map();
function weightedRandomChoice(arr) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  if (randomCacheIndex >= RANDOM_CACHE_SIZE) {
    randomCacheIndex = 0;
  }
  const r = randomCache[randomCacheIndex++];
  // Кэшируем результат Math.pow для часто используемых значений
  let powResult;
  const cacheKey = r.toFixed(4);
  if (powCache.has(cacheKey)) {
    powResult = powCache.get(cacheKey);
  } else {
    powResult = Math.pow(r, 1.5);
    if (powCache.size < 100) { // Ограничиваем размер кэша
      powCache.set(cacheKey, powResult);
    }
  }
  const index = Math.floor(powResult * arr.length);
  return arr[index];
}

/**
 * Генерирует случайное имя с улучшенной реалистичностью
 * @param {string} gender - 'male', 'female' или 'random'
 * @param {boolean} includeMiddle - включить ли второе имя (по умолчанию авто-определение)
 * @returns {object} - {firstName, middleName, lastName, fullName, gender}
 */
function generateRandomName(gender = 'random', includeMiddle = null) {
  // Определяем пол
  if (gender === 'random') {
    gender = Math.random() > 0.5 ? 'male' : 'female';
  }
  
  // Используем взвешенный выбор для более реалистичного распределения имен
  const firstName = gender === 'male' 
    ? weightedRandomChoice(MALE_FIRST_NAMES)
    : weightedRandomChoice(FEMALE_FIRST_NAMES);
  
  // Второе имя добавляется в 70% случаев (если не указано явно)
  let middleName = '';
  if (includeMiddle === null) {
    includeMiddle = Math.random() < 0.7;
  }
  if (includeMiddle) {
    middleName = randomChoice(MIDDLE_NAMES);
  }
  
  const lastName = weightedRandomChoice(LAST_NAMES);
  
  // Формируем полное имя
  const fullName = middleName 
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
  
  return {
    firstName,
    middleName,
    lastName,
    fullName,
    gender
  };
}

/**
 * Генерирует случайный адрес улицы с улучшенной реалистичностью
 * @returns {string} - например "1234 N Oak Street" или "567 Maple Avenue"
 */
function generateStreetAddress() {
  // Генерируем номер дома с реалистичным распределением
  // Большинство домов имеют номера от 1 до 2000
  let number;
  const rand = Math.random();
  if (rand < 0.6) {
    // 60% - малые номера (1-500)
    number = randomInt(1, 500);
  } else if (rand < 0.85) {
    // 25% - средние номера (501-2000)
    number = randomInt(501, 2000);
  } else {
    // 15% - большие номера (2001-9999)
    number = randomInt(2001, 9999);
  }
  
  // Направление добавляется в 30% случаев
  const direction = Math.random() < 0.3 ? randomChoice(STREET_DIRECTIONS) + ' ' : '';
  
  const streetName = randomChoice(STREET_NAMES);
  const streetType = randomChoice(STREET_TYPES);
  
  return `${number} ${direction}${streetName} ${streetType}`;
}

/**
 * Генерирует случайный номер квартиры/офиса с улучшенной реалистичностью
 * @returns {string} - например "Apt 4B", "Suite 201" или ""
 */
function generateAddress2() {
  // 35% шанс что будет address2 (увеличено для большей реалистичности)
  if (Math.random() > 0.65) {
    const types = [
      { name: 'Apt', weight: 0.5 },      // 50% - самый популярный
      { name: 'Suite', weight: 0.25 },   // 25% - для коммерческих
      { name: 'Unit', weight: 0.15 },    // 15%
      { name: '#', weight: 0.1 }         // 10%
    ];
    
    // Взвешенный выбор типа
    const rand = Math.random();
    let cumulative = 0;
    let type = 'Apt';
    for (const t of types) {
      cumulative += t.weight;
      if (rand < cumulative) {
        type = t.name;
        break;
      }
    }
    
    const rand2 = Math.random();
    if (rand2 < 0.4) {
      // 40% - только числовой номер (1-999)
      return `${type} ${randomInt(1, 999)}`;
    } else if (rand2 < 0.75) {
      // 35% - буквенно-числовой (1-50 + A-Z)
      const letter = String.fromCharCode(65 + randomInt(0, 25)); // A-Z
      return `${type} ${randomInt(1, 50)}${letter}`;
    } else {
      // 25% - многоцифровой номер (для больших зданий, 100-5000)
      const floor = randomInt(1, 50);
      const unit = randomInt(1, 99).toString().padStart(2, '0');
      return `${type} ${floor}${unit}`;
    }
  }
  
  return '';
}

/**
 * Генерирует ZIP код для штата
 * @param {string} stateCode - код штата (например 'CA')
 * @returns {string} - ZIP код
 */
function generateZipCode(stateCode) {
  const range = ZIP_RANGES[stateCode];
  if (!range) return '10000';
  
  const zip = randomInt(range[0], range[1]);
  return zip.toString().padStart(5, '0');
}

// Кэш для оптимизации (кэшируем список кодов штатов)
const STATE_CODES_CACHE = Object.keys(CITIES_BY_STATE);

// Кэш для городов по штатам (для быстрого доступа)
const CITIES_CACHE = new Map();
for (const [code, stateInfo] of Object.entries(CITIES_BY_STATE)) {
  CITIES_CACHE.set(code, stateInfo.cities);
}

// Маппинг регионов США по IP-геолокации на штаты
// Используется для более точного определения штата по IP
const REGION_TO_STATE_MAP = {
  // Точные названия регионов
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY',
  // Коды штатов (на случай если API вернет код)
  'AL': 'AL', 'AK': 'AK', 'AZ': 'AZ', 'AR': 'AR', 'CA': 'CA', 'CO': 'CO',
  'CT': 'CT', 'DE': 'DE', 'FL': 'FL', 'GA': 'GA', 'HI': 'HI', 'ID': 'ID',
  'IL': 'IL', 'IN': 'IN', 'IA': 'IA', 'KS': 'KS', 'KY': 'KY', 'LA': 'LA',
  'ME': 'ME', 'MD': 'MD', 'MA': 'MA', 'MI': 'MI', 'MN': 'MN', 'MS': 'MS',
  'MO': 'MO', 'MT': 'MT', 'NE': 'NE', 'NV': 'NV', 'NH': 'NH', 'NJ': 'NJ',
  'NM': 'NM', 'NY': 'NY', 'NC': 'NC', 'ND': 'ND', 'OH': 'OH', 'OK': 'OK',
  'OR': 'OR', 'PA': 'PA', 'RI': 'RI', 'SC': 'SC', 'SD': 'SD', 'TN': 'TN',
  'TX': 'TX', 'UT': 'UT', 'VT': 'VT', 'VA': 'VA', 'WA': 'WA', 'WV': 'WV',
  'WI': 'WI', 'WY': 'WY'
};

/**
 * Получает информацию о геолокации по IP адресу
 * @returns {Promise<object|null>} - объект с информацией о локации или null
 */
async function getIPGeolocation() {
  try {
    // Используем ipwhois.app API (поддерживает CORS)
    const response = await fetch('https://ipwho.is/');
    const data = await response.json();
    
    if (data.success && data.country_code === 'US' && data.region_code) {
      console.log('[DataGenerator] ✅ IP Geolocation detected:', {
        ip: data.ip,
        city: data.city,
        region: data.region,
        regionCode: data.region_code,
        country: data.country
      });
      return {
        country: data.country,
        countryCode: data.country_code,
        region: data.region_code, // Код штата (например 'CA')
        regionName: data.region, // Название региона (например 'California')
        city: data.city,
        zip: data.postal,
        lat: data.latitude,
        lon: data.longitude,
        timezone: data.timezone ? data.timezone.id : null
      };
    } else if (data.country_code) {
      console.log('[DataGenerator] ⚠️ IP is not from USA:', data.country);
      return null;
    }
    return null;
  } catch (error) {
    console.error('[DataGenerator] Error fetching IP geolocation:', error);
    return null;
  }
}

/**
 * Определяет штат США по данным IP-геолокации
 * @param {object} geoData - данные геолокации
 * @returns {string|null} - код штата или null
 */
function getStateFromGeolocation(geoData) {
  if (!geoData) return null;
  
  // Сначала пробуем использовать код региона
  if (geoData.region && REGION_TO_STATE_MAP[geoData.region]) {
    return REGION_TO_STATE_MAP[geoData.region];
  }
  
  // Затем пробуем название региона
  if (geoData.regionName && REGION_TO_STATE_MAP[geoData.regionName]) {
    return REGION_TO_STATE_MAP[geoData.regionName];
  }
  
  return null;
}

/**
 * Генерирует полный случайный адрес для США с улучшенной производительностью
 * @param {string} stateCode - код штата (опционально, если null - случайный)
 * @param {object} options - дополнительные опции {includeMiddleName: boolean, gender: string}
 * @returns {object} - полный объект адреса
 */
function generateRandomAddress(stateCode = null, options = {}) {
  // Если штат не указан - выбираем случайный из кэша
  if (!stateCode) {
    stateCode = randomChoice(STATE_CODES_CACHE);
  }
  
  const stateInfo = CITIES_BY_STATE[stateCode];
  if (!stateInfo) {
    // Fallback на California если штат не найден
    stateCode = 'CA';
    stateInfo = CITIES_BY_STATE['CA'];
  }
  
  // Генерируем имя с опциями
  const name = generateRandomName(
    options.gender || 'random',
    options.includeMiddleName
  );
  
  // Выбираем город из списка штата (используем кэш)
  const cities = CITIES_CACHE.get(stateCode) || stateInfo.cities;
  const city = randomChoice(cities);
  const zipCode = generateZipCode(stateCode);
  
  // Генерируем адрес улицы и квартиры
  const address1 = generateStreetAddress();
  const address2 = generateAddress2();
  
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Более уникальный ID
    name: name.fullName,
    firstName: name.firstName,
    middleName: name.middleName,
    lastName: name.lastName,
    address1: address1,
    address2: address2,
    city: city,
    state: stateInfo.name,
    stateCode: stateCode,
    postal: zipCode,
    countryText: 'United States',
    countryValue: 'US',
    gender: name.gender
  };
}

/**
 * Генерирует несколько случайных адресов с оптимизацией
 * @param {number} count - количество адресов
 * @param {string} stateCode - код штата (опционально)
 * @param {object} options - дополнительные опции для генерации
 * @returns {array} - массив адресов
 */
function generateMultipleAddresses(count = 5, stateCode = null, options = {}) {
  // Оптимизация: предварительное выделение массива
  const addresses = new Array(count);
  
  // Если штат не указан, выбираем один раз для всех адресов (оптимизация)
  if (!stateCode) {
    stateCode = randomChoice(STATE_CODES_CACHE);
  }
  
  // Генерируем все адреса
  for (let i = 0; i < count; i++) {
    addresses[i] = generateRandomAddress(stateCode, options);
  }
  
  return addresses;
}

/**
 * Получает список всех штатов (с кэшированием)
 * @returns {array} - массив объектов {code, name}
 */
function getAllStates() {
  return STATE_CODES_CACHE.map(code => ({
    code: code,
    name: CITIES_BY_STATE[code].name
  }));
}

/**
 * Получает список городов для штата
 * @param {string} stateCode - код штата
 * @returns {array} - массив городов
 */
function getCitiesForState(stateCode) {
  const stateInfo = CITIES_BY_STATE[stateCode];
  return stateInfo ? stateInfo.cities : [];
}

/**
 * Генерирует телефонный номер США (опционально)
 * @param {string} stateCode - код штата (для определения area code)
 * @returns {string} - телефон в формате (555) 123-4567
 */
function generatePhoneNumber(stateCode = null) {
  // Area codes (555 используется для примеров)
  const areaCode = randomInt(200, 999);
  const exchange = randomInt(200, 999);
  const subscriber = randomInt(1000, 9999);
  
  return `(${areaCode}) ${exchange}-${subscriber}`;
}

/**
 * Генерирует email адрес на основе имени
 * @param {object} name - объект имени {firstName, lastName}
 * @returns {string} - email адрес
 */
function generateEmail(name) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
  const domain = randomChoice(domains);
  
  const patterns = [
    `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}`,
    `${name.firstName.toLowerCase()}${name.lastName.toLowerCase()}`,
    `${name.firstName.toLowerCase()}_${name.lastName.toLowerCase()}`,
    `${name.firstName.toLowerCase()}${randomInt(1, 999)}`
  ];
  
  const username = randomChoice(patterns);
  return `${username}@${domain}`;
}

// Экспорт функций для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  // Node.js
  module.exports = {
    generateRandomName,
    generateRandomAddress,
    generateMultipleAddresses,
    getAllStates,
    getCitiesForState,
    generatePhoneNumber,
    generateEmail,
    generateStreetAddress,
    generateZipCode,
    getIPGeolocation,
    getStateFromGeolocation
  };
}

// Для использования в браузере (Chrome Extension Content Script)
if (typeof window !== 'undefined') {
  window.DataGenerator = {
    generateRandomName,
    generateRandomAddress,
    generateMultipleAddresses,
    getAllStates,
    getCitiesForState,
    generatePhoneNumber,
    generateEmail,
    generateStreetAddress,
    generateZipCode,
    getIPGeolocation,
    getStateFromGeolocation
  };
}

// Для использования в Service Worker (Chrome Extension Background)
if (typeof self !== 'undefined' && typeof window === 'undefined') {
  self.DataGenerator = {
    generateRandomName,
    generateRandomAddress,
    generateMultipleAddresses,
    getAllStates,
    getCitiesForState,
    generatePhoneNumber,
    generateEmail,
    generateStreetAddress,
    generateZipCode,
    getIPGeolocation,
    getStateFromGeolocation
  };
}

