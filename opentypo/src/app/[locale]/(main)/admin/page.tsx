"use client";

import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    author: [{ name: "", link: "" }],
    category_id: "",
    language_id: "",
    license: "",
    download_url: "", // download_url 필드 추가
  });

  const [selectedPersonalities, setSelectedPersonalities] = useState<
    { id: string; name: string }[]
  >([]);

  const [fontFile, setFontFile] = useState<File | null>(null);
  const [availablePersonalities, setAvailablePersonalities] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchPersonalities = async () => {
      const { data, error } = await supabaseClient
        .from("personality")
        .select("id, name");

      if (!error && data) {
        setAvailablePersonalities(data);
      }
    };
    fetchPersonalities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAuthorChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const newAuthors = [...formData.author];
    newAuthors[index][name as keyof (typeof newAuthors)[0]] = value;
    setFormData((prevData) => ({
      ...prevData,
      author: newAuthors,
    }));
  };

  const addAuthor = () => {
    setFormData((prevData) => ({
      ...prevData,
      author: [...prevData.author, { name: "", link: "" }],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFontFile(file || null);
  };

  const addPersonality = (selectedId: string) => {
    const selectedPersonality = availablePersonalities.find(
      (p) => p.id === selectedId,
    );
    if (
      selectedPersonality &&
      !selectedPersonalities.find((p) => p.id === selectedPersonality.id)
    ) {
      setSelectedPersonalities((prev) => [...prev, selectedPersonality]);
    }
  };

  const removePersonality = (id: string) => {
    setSelectedPersonalities((prev) =>
      prev.filter((personality) => personality.id !== id),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fontFile) {
      toast({
        title: "No file selected",
        description: "Please select a font file to upload.",
      });
      return;
    }

    try {
      // 폰트명 가공하여 경로 생성
      const formattedName = formData.name.toLowerCase().replace(/ /g, "_");
      const filePath = `${formattedName}/${fontFile.name}`;

      // 폰트 파일을 Supabase Storage에 업로드
      const { error: uploadError } = await supabaseClient.storage
        .from("fonts")
        .upload(filePath, fontFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 폰트 정보를 데이터베이스에 저장
      const { data, error: fontInsertError } = await supabaseClient
        .from("fonts")
        .insert([{ ...formData, font_file_path: filePath }])
        .select();

      if (fontInsertError || !data || data.length === 0) {
        throw new Error(fontInsertError?.message || "Font insert failed.");
      }

      const insertedFontId = data[0].id;

      // font_personality 테이블에 데이터 저장
      for (const personality of selectedPersonalities) {
        await supabaseClient.from("font_personality").insert([
          {
            font_id: insertedFontId,
            personality_id: personality.id,
          },
        ]);
      }

      toast({
        title: "Font added successfully!",
      });

      setFormData({
        name: "",
        author: [{ name: "", link: "" }],
        category_id: "",
        language_id: "",
        license: "",
        download_url: "", // download_url 초기화
      });
      setSelectedPersonalities([]);
      setFontFile(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Failed to add the font",
        description: errorMessage || "Please try again.",
      });
    }
  };

  return (
    <main className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Font Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Authors</Label>
          {formData.author.map((author, index) => (
            <div key={index} className="space-y-2">
              <div>
                <Label htmlFor={`author-name-${index}`}>Name</Label>
                <Input
                  type="text"
                  id={`author-name-${index}`}
                  name="name"
                  value={author.name}
                  onChange={(e) => handleAuthorChange(index, e)}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`author-link-${index}`}>Link</Label>
                <Input
                  type="text"
                  id={`author-link-${index}`}
                  name="link"
                  value={author.link}
                  onChange={(e) => handleAuthorChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addAuthor} className="mt-2">
            Add Author
          </Button>
        </div>

        <div>
          <Label htmlFor="category_id">Category</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                category_id: value,
              }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Serif</SelectItem>
              <SelectItem value="2">Sans-serif</SelectItem>
              {/* 실제 카테고리 데이터를 여기에 동적으로 추가할 수 있습니다. */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language_id">Language</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                language_id: value,
              }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Korean</SelectItem>
              <SelectItem value="2">English</SelectItem>
              {/* 실제 언어 데이터를 여기에 동적으로 추가할 수 있습니다. */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="license">License</Label>
          <Input
            type="text"
            id="license"
            name="license"
            value={formData.license}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="font_file">Font File</Label>
          <Input
            type="file"
            id="font_file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="download_url">Download URL</Label>
          <Input
            type="text"
            id="download_url"
            name="download_url"
            value={formData.download_url}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="personality">Add Personality</Label>
          <Select onValueChange={addPersonality}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a personality" />
            </SelectTrigger>
            <SelectContent>
              {availablePersonalities.map((personality) => (
                <SelectItem key={personality.id} value={personality.id}>
                  {personality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Label>Selected Personalities</Label>
          <ul>
            {selectedPersonalities.map((personality) => (
              <li
                key={personality.id}
                className="flex items-center justify-between"
              >
                {personality.name}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePersonality(personality.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
