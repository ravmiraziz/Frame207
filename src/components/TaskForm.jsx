import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { X, Calendar, Paperclip, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { taskSchema } from "@/schema/taskSchema";
import {
  fetchAssignees,
  fetchThemes,
  fetchTags,
  fetchPeriodicities,
} from "@/api/mock";

import { FieldWrapper } from "./ui/FieldWrapper";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Switch } from "./ui/Switch";
import { Checkbox } from "./ui/Checkbox";
import { Select } from "./ui/Select";
import { MultiSelect } from "./ui/MultiSelect";
import { TagsSelect } from "./ui/TagsSelect";

export const TaskForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      context: "",
      isTeam: false,
      isRoutine: false,
      routineName: "",
      periodicity: "",
      routineDescription: "",
      assignees: [],
      deadlineDate: "",
      deadlineTime: "",
      deadlineDays: "",
      theme: "",
      tags: [],
    },
  });

  const isTeam = watch("isTeam");
  const isRoutine = watch("isRoutine");
  const contextValue = watch("context");
  const routineNameValue = watch("routineName");
  const routineDescValue = watch("routineDescription");

  useEffect(() => {
    setValue("assignees", []);
  }, [isTeam, setValue]);

  const { data: assigneesOptions = [], isLoading: isLoadingAssignees } =
    useQuery({
      queryKey: ["assignees", debouncedQuery, isTeam],
      queryFn: () => fetchAssignees(debouncedQuery, isTeam),
    });

  const { data: themesOptions = [] } = useQuery({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });

  const { data: tagsOptions = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const { data: periodicityOptions = [] } = useQuery({
    queryKey: ["periodicities"],
    queryFn: fetchPeriodicities,
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Задача успешно создана! Проверьте консоль.");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-purple-700 font-semibold">
          <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          Создание задачи
        </div>
        <button className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pt-4">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button className="flex-1 bg-purple-600 text-white text-sm font-medium py-2 rounded-full shadow-sm">
            Создание задачи
          </button>
          <button className="flex-1 text-gray-500 text-sm font-medium py-2 rounded-full hover:text-gray-700">
            Создание напоминания
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="context"
            control={control}
            render={({ field }) => (
              <FieldWrapper
                label="Контекст задачи"
                required
                error={errors.context?.message}
              >
                <Textarea
                  {...field}
                  placeholder="Выполнить какую-нибудь задачу"
                  maxLength={4096}
                  currentLength={contextValue?.length}
                  error={!!errors.context}
                />
              </FieldWrapper>
            )}
          />

          <div className="flex items-center justify-between">
            <Controller
              name="isTeam"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm text-gray-600">
                    Назначить на команду
                  </span>
                </div>
              )}
            />
            <Controller
              name="isRoutine"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm text-gray-600">Рутинная задача</span>
                  <Info className="w-4 h-4 text-purple-500" />
                </div>
              )}
            />
          </div>

          <AnimatePresence>
            {isRoutine && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 border border-purple-200 rounded-2xl p-4 bg-purple-50/30 overflow-hidden"
              >
                <Controller
                  name="routineName"
                  control={control}
                  render={({ field }) => (
                    <FieldWrapper
                      label="Название рутинной задачи"
                      required
                      error={errors.routineName?.message}
                    >
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Укажите название рутинной задачи"
                          error={!!errors.routineName}
                        />
                        <div className="absolute right-4 top-2.5 text-[10px] text-gray-400">
                          {routineNameValue?.length || 0}/255
                        </div>
                      </div>
                    </FieldWrapper>
                  )}
                />
                <Controller
                  name="periodicity"
                  control={control}
                  render={({ field }) => (
                    <FieldWrapper
                      label="Периодичность"
                      required
                      error={errors.periodicity?.message}
                    >
                      <Select
                        value={field.value || ""}
                        onChange={field.onChange}
                        options={periodicityOptions}
                        placeholder="Выберите периодичность"
                        error={!!errors.periodicity}
                      />
                    </FieldWrapper>
                  )}
                />
                <Controller
                  name="routineDescription"
                  control={control}
                  render={({ field }) => (
                    <FieldWrapper
                      label="Описание"
                      error={errors.routineDescription?.message}
                    >
                      <Textarea
                        {...field}
                        placeholder="Описание рутинной задачи"
                        maxLength={1024}
                        currentLength={routineDescValue?.length}
                        error={!!errors.routineDescription}
                      />
                    </FieldWrapper>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Controller
            name="assignees"
            control={control}
            render={({ field }) => (
              <FieldWrapper
                label="Исполнители задачи"
                error={errors.assignees?.message}
              >
                <MultiSelect
                  selectedItems={field.value}
                  onChange={field.onChange}
                  options={assigneesOptions}
                  onSearchChange={setSearchQuery}
                  placeholder={
                    isTeam ? "Укажите команды" : "Укажите исполнителей проекта"
                  }
                  isLoading={isLoadingAssignees}
                  error={!!errors.assignees}
                />
              </FieldWrapper>
            )}
          />

          <div className="flex gap-3">
            <div className="flex-1">
              <FieldWrapper
                label="Срок выполнения"
                error={
                  errors.deadlineDate?.message || errors.deadlineDays?.message
                }
              >
                {isRoutine ? (
                  <Controller
                    name="deadlineDays"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="О дней"
                          error={!!errors.deadlineDays}
                        />
                        <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  />
                ) : (
                  <Controller
                    name="deadlineDate"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          type="date"
                          {...field}
                          error={!!errors.deadlineDate}
                          className="text-gray-600"
                        />
                        <div className="absolute right-3 top-2.5 text-purple-500 pointer-events-none">
                          <Calendar className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                  />
                )}
              </FieldWrapper>
            </div>
            <div className="flex-1">
              <FieldWrapper label="&nbsp;" error={errors.deadlineTime?.message}>
                <Controller
                  name="deadlineTime"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        type="time"
                        {...field}
                        placeholder="00:00"
                        error={!!errors.deadlineTime}
                        className="text-gray-600"
                      />
                    </div>
                  )}
                />
              </FieldWrapper>
            </div>
          </div>

          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <FieldWrapper label="Указать тему" error={errors.theme?.message}>
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={themesOptions}
                  placeholder="Выберите тему"
                  error={!!errors.theme}
                />
              </FieldWrapper>
            )}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <FieldWrapper label="Теги" error={errors.tags?.message}>
                <TagsSelect
                  selectedTags={field.value || []}
                  onChange={field.onChange}
                  options={tagsOptions}
                  error={!!errors.tags}
                />
              </FieldWrapper>
            )}
          />

          <FieldWrapper label="Файлы">
            <div className="relative">
              <Input
                type="file"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              />
              <div className="flex h-10 w-full items-center justify-between rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-400">
                <span>Прикрепите файлы</span>
                <Paperclip className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          </FieldWrapper>

          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-full transition-colors shadow-md"
        >
          Создать задачу
        </button>
      </div>
    </div>
  );
};
