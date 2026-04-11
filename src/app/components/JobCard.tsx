import { MapPin, DollarSign, Clock, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  logo?: string;
  tags?: string[];
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedDate,
  tags = [],
}: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link to={`/jobs/${id}`}>
              <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-gray-600">{company}</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{postedDate}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{type}</Badge>
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/jobs/${id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
